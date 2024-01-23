"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showActividadActual = exports.cancelarEditarActividad = exports.eliminarActividad = exports.finalizarActividad = exports.editarActividad = exports.buscarActividad = exports.guardarActividad = exports.mostrarPlanificacion = void 0;
const roles_dta_1 = require("../../data_access/roles_dta");
const date_controller_1 = require("../processes/date_controller");
const usuarios_dta_1 = require("../../data_access/usuarios_dta");
const campos_dta_1 = require("../../data_access/campos_dta");
const estados_dta_1 = require("../../data_access/estados_dta");
const configuracion_dta_1 = require("../../data_access/configuracion_dta");
const planificacion_dta_1 = require("../../data_access/planificacion_dta");
const siembras_dta_1 = require("../../data_access/siembras_dta");
const cultivos_dta_1 = require("../../data_access/cultivos_dta");
const mostrarPlanificacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { campo } = req.params;
    let actividades = [];
    let actividad = {
        "id": 0,
        "actividad": '',
        "fecha_inicio": '',
        "fecha_fin": '',
        "activo": 0,
    };
    if (req.session.user) {
        if (campo == '0') {
            const _campos = yield (0, campos_dta_1.getCampos)(req.session.user);
            if (_campos.length > 0) {
                campo = _campos[0].dataValues.id;
            }
            else {
                campo = "0";
            }
        }
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
        let campos;
        if ((usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario) != 1) {
            campos = yield (0, campos_dta_1.getCamposParaActividades)(req.session.user, campo);
        }
        else {
            campos = yield (0, campos_dta_1.getAllCamposParaActividades)(campo);
        }
        const config = yield (0, configuracion_dta_1.getConfig)();
        const estados = yield (0, estados_dta_1.getActividades)(config[0].dataValues.campo_vacio, config[0].dataValues.campo_sembrado);
        const date = (0, date_controller_1.getDate)();
        //Obtener actividades
        const siembras = yield (0, siembras_dta_1.getSiembrasPorCampo)(campo);
        const planificacion = yield (0, planificacion_dta_1.getPlanificacion)(campo);
        if (siembras.length > 0) {
            for (let i = 0; i < siembras.length; i++) {
                const cultivo = yield (0, cultivos_dta_1.getNombreCultivo)(siembras[i].dataValues.id_cultivo);
                siembras[i].dataValues.actividad = "Producción de " + cultivo;
            }
            let helper = 1;
            siembras.forEach(siembras => {
                actividad = { "id": 0, "actividad": '', "fecha_inicio": '', "fecha_fin": '', "activo": 0 };
                actividad['actividad'] = siembras.dataValues.actividad;
                actividad['fecha_inicio'] = siembras.dataValues.fecha_siembra;
                actividad['fecha_fin'] = siembras.dataValues.fecha_cosecha_est;
                actividad['activo'] = helper;
                actividades.push(actividad);
                helper = 0;
            });
        }
        if (planificacion.length > 0) {
            for (let i = 0; i < planificacion.length; i++) {
                const actividad = yield (0, estados_dta_1.getActividadEstado)(planificacion[i].dataValues.actividad);
                planificacion[i].dataValues.nomActividad = actividad;
            }
            planificacion.forEach(planificacion => {
                actividad = { "id": 0, "actividad": '', "fecha_inicio": '', "fecha_fin": '', "activo": 0 };
                actividad['id'] = planificacion.dataValues.id;
                actividad['actividad'] = planificacion.dataValues.nomActividad;
                actividad['fecha_inicio'] = planificacion.dataValues.fecha_inicio;
                actividad['fecha_fin'] = planificacion.dataValues.fecha_fin;
                actividad['activo'] = planificacion.dataValues.activo;
                actividades.push(actividad);
            });
        }
        const _campo = yield (0, campos_dta_1.getCampo)(campo);
        res.render('planning', { campos, _campo, estados, actividades, date, usuario, rol, activo: false, error: '' });
    }
    else {
        res.render('login', { error: '' });
    }
});
exports.mostrarPlanificacion = mostrarPlanificacion;
const guardarActividad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    let actividades = [];
    let actividad = {
        "id": 0,
        "actividad": '',
        "fecha_inicio": '',
        "fecha_fin": ''
    };
    const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
    const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
    const campos = yield (0, campos_dta_1.getCamposParaActividades)(req.session.user, body.id_campo);
    const config = yield (0, configuracion_dta_1.getConfig)();
    const estados = yield (0, estados_dta_1.getActividades)(config[0].dataValues.campo_vacio, config[0].dataValues.campo_sembrado);
    const date = (0, date_controller_1.getDate)();
    //Obtener actividades
    const siembras = yield (0, siembras_dta_1.getSiembrasPorCampo)(body.id_campo);
    const planificacion = yield (0, planificacion_dta_1.getPlanificacion)(body.id_campo);
    if (siembras.length > 0) {
        for (let i = 0; i < siembras.length; i++) {
            const cultivo = yield (0, cultivos_dta_1.getNombreCultivo)(siembras[i].dataValues.id_cultivo);
            siembras[i].dataValues.actividad = "Producción de " + cultivo;
        }
        siembras.forEach(siembras => {
            actividad = { "id": 0, "actividad": '', "fecha_inicio": '', "fecha_fin": '' };
            actividad['actividad'] = siembras.dataValues.actividad;
            actividad['fecha_inicio'] = siembras.dataValues.fecha_siembra;
            actividad['fecha_fin'] = siembras.dataValues.fecha_cosecha_est;
            actividades.push(actividad);
        });
    }
    if (planificacion.length > 0) {
        for (let i = 0; i < planificacion.length; i++) {
            const actividad = yield (0, estados_dta_1.getActividadEstado)(planificacion[i].dataValues.actividad);
            planificacion[i].dataValues.nomActividad = actividad;
        }
        planificacion.forEach(planificacion => {
            actividad = { "id": 0, "actividad": '', "fecha_inicio": '', "fecha_fin": '' };
            actividad['id'] = planificacion.dataValues.id;
            actividad['actividad'] = planificacion.dataValues.nomActividad;
            actividad['fecha_inicio'] = planificacion.dataValues.fecha_inicio;
            actividad['fecha_fin'] = planificacion.dataValues.fecha_fin;
            actividades.push(actividad);
        });
    }
    const _campo = yield (0, campos_dta_1.getCampo)(body.id_campo);
    if (body.fecha_fin > body.fecha_inicio) {
        if (yield (0, planificacion_dta_1.searchPlanificacion)(req)) {
            res.render('planning', { campos, _campo, actividades, estados, date, usuario, rol, activo: true, error: '* Ya tiene una actividad planificada para este periodo' });
        }
        else {
            if (siembras.length > 0) {
                let flag = 0;
                for (let i = 0; i < siembras.length; i++) {
                    if (body.fecha_inicio < siembras[i].dataValues.fecha_siembra && date >= body.fecha_inicio) {
                        yield (0, campos_dta_1.changeEstado)(body.id_campo, body.actividad);
                        flag = 1;
                    }
                }
                yield (0, planificacion_dta_1.postPlanificacion)(req, flag);
            }
            else {
                if (date >= body.fecha_inicio) {
                    yield (0, campos_dta_1.changeEstado)(body.id_campo, body.actividad);
                    yield (0, planificacion_dta_1.postPlanificacion)(req, 1);
                }
                else {
                    yield (0, planificacion_dta_1.postPlanificacion)(req, 0);
                }
            }
            res.redirect('/actividades/' + body.id_campo);
        }
    }
    else {
        res.render('planning', { campos, _campo, actividades, estados, date, usuario, rol, activo: true, error: '* La fecha de finalización debe ser mayor que la fecha de inicio' });
    }
});
exports.guardarActividad = guardarActividad;
const buscarActividad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        const { id } = req.params;
        const actividad = yield (0, planificacion_dta_1.getActividad)(id);
        const date = (0, date_controller_1.getDate)();
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
        const nombre = yield (0, estados_dta_1.getActividadEstado)(actividad === null || actividad === void 0 ? void 0 : actividad.dataValues.actividad);
        if (actividad !== null) {
            res.render('planning_edit', { actividad, nombre, date, usuario, rol, error: '' });
        }
        else {
            res.status(404).json({ message: 'No existe el rol' });
        }
    }
    else {
        res.render('login', { error: '' });
    }
});
exports.buscarActividad = buscarActividad;
const editarActividad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const actividad = yield (0, planificacion_dta_1.getActividad)(id);
    if (actividad !== null) {
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
        const date = (0, date_controller_1.getDate)();
        const nombre = yield (0, estados_dta_1.getActividadEstado)(actividad === null || actividad === void 0 ? void 0 : actividad.dataValues.actividad);
        if (body.fecha_fin > body.fecha_inicio) {
            if (yield (0, planificacion_dta_1.searchPlanificacion)(req)) {
                res.render('planning_edit', { actividad, nombre, date, usuario, rol, activo: true, error: '* Esta actividad ya está planificada en este periodo' });
            }
            else {
                yield (0, planificacion_dta_1.putPlanificacion)(req);
                res.redirect('/actividades/' + body.id_campo);
            }
        }
        else {
            res.render('planning_edit', { actividad, nombre, date, usuario, rol, activo: true, error: '* La fecha de finalización debe ser mayor que la fecha de inicio' });
        }
    }
    else {
        res.status(404).json({ message: 'No existe la actividad' });
    }
});
exports.editarActividad = editarActividad;
const finalizarActividad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const actividad = yield (0, planificacion_dta_1.getActividad)(id);
    if (actividad !== null) {
        const siembras = yield (0, siembras_dta_1.getSiembrasPorCampo)(actividad.dataValues.id_campo);
        if (siembras.length <= 0) {
            const config = yield (0, configuracion_dta_1.getConfig)();
            yield (0, campos_dta_1.changeEstado)(actividad.dataValues.id_campo, config[0].dataValues.campo_vacio);
        }
        yield (0, planificacion_dta_1.finishPlanificacion)(id);
        res.redirect('/actividades/' + actividad.dataValues.id_campo);
    }
    else {
        res.status(404).json({ message: 'No existe la actividad' });
    }
});
exports.finalizarActividad = finalizarActividad;
const eliminarActividad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const actividad = yield (0, planificacion_dta_1.getActividad)(id);
    if (actividad !== null) {
        yield (0, planificacion_dta_1.deletePlanificacion)(id);
        res.redirect('/actividades/' + actividad.dataValues.id_campo);
    }
    else {
        res.status(404).json({ message: 'No existe la actividad' });
    }
});
exports.eliminarActividad = eliminarActividad;
const cancelarEditarActividad = (req, res) => {
    const { campo } = req.params;
    res.redirect('/actividades/' + campo);
};
exports.cancelarEditarActividad = cancelarEditarActividad;
const showActividadActual = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_campo } = req.params;
    const actividad = yield (0, planificacion_dta_1.getActividadActual)(id_campo);
    const nombre = yield (0, estados_dta_1.getActividadEstado)(actividad === null || actividad === void 0 ? void 0 : actividad.dataValues.actividad);
    const data = {
        actividad: nombre,
        fecha_inicio: actividad === null || actividad === void 0 ? void 0 : actividad.dataValues.fecha_inicio,
        fecha_fin: actividad === null || actividad === void 0 ? void 0 : actividad.dataValues.fecha_fin
    };
    res.json(data);
});
exports.showActividadActual = showActividadActual;
//# sourceMappingURL=planning_controller.js.map