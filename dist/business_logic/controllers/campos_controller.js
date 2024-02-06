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
exports.cancelarEditarCampo = exports.mostrarTrazado = exports.eliminarCampo = exports.editarFormaCampo = exports.editarCampo = exports.agregarCampo = exports.mostrarCampo = exports.buscarCampo = exports.listarCampos = exports.mostrarCampos = void 0;
const campos_dta_1 = require("../../data_access/campos_dta");
const date_controller_1 = require("../processes/date_controller");
const usuarios_dta_1 = require("../../data_access/usuarios_dta");
const roles_dta_1 = require("../../data_access/roles_dta");
const cultivos_dta_1 = require("../../data_access/cultivos_dta");
const estados_dta_1 = require("../../data_access/estados_dta");
const configuracion_dta_1 = require("../../data_access/configuracion_dta");
const mostrarCampos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        let campos;
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        if ((usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario) != 1) {
            campos = yield (0, campos_dta_1.getCampos)(req.session.user);
        }
        else {
            campos = yield (0, campos_dta_1.getCamposActivos)();
        }
        const config = yield (0, configuracion_dta_1.getConfig)();
        for (let i = 0; i < campos.length; i++) {
            const estado = yield (0, estados_dta_1.getEstado)(campos[i].dataValues.estado);
            campos[i].dataValues.color = estado === null || estado === void 0 ? void 0 : estado.dataValues.color;
            campos[i].dataValues.nombreEstado = estado === null || estado === void 0 ? void 0 : estado.dataValues.nombre;
            campos[i].dataValues.campoSembrado = config[0].dataValues.campo_sembrado;
        }
        res.json(campos);
    }
    else {
        res.render('login', { error: '' });
    }
});
exports.mostrarCampos = mostrarCampos;
const listarCampos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
        const config = yield (0, configuracion_dta_1.getConfig)();
        let campos;
        let encargado;
        if ((usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario) != 1) {
            campos = yield (0, campos_dta_1.getCampos)(req.session.user);
        }
        else {
            campos = yield (0, campos_dta_1.getCamposActivos)();
            for (let i = 0; i < campos.length; i++) {
                encargado = yield (0, usuarios_dta_1.getNombreUsuario)(campos[i].dataValues.encargado);
                campos[i].dataValues.nomEncargado = encargado;
            }
        }
        const date = (0, date_controller_1.getDate)();
        let estado;
        for (let i = 0; i < campos.length; i++) {
            estado = yield (0, estados_dta_1.getNombreEstado)(campos[i].dataValues.estado);
            campos[i].dataValues.nomEstado = estado;
        }
        res.render('fields', { campos, date, usuario, rol, config });
    }
    else {
        res.render('login', { error: '' });
    }
});
exports.listarCampos = listarCampos;
const buscarCampo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const campo = yield (0, campos_dta_1.getCampo)(id);
    if (campo !== null) {
        const date = (0, date_controller_1.getDate)();
        const estados = yield (0, estados_dta_1.getEstadosForCampos)();
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
        res.render('fields_edit', { campo, date, usuario, rol, estados, error: '' });
    }
    else {
        res.status(404).json({ message: 'No existe el campo' });
    }
});
exports.buscarCampo = buscarCampo;
const mostrarCampo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_campo } = req.params;
    const campo = yield (0, campos_dta_1.getCampo)(id_campo);
    if (campo !== null) {
        res.json(campo);
    }
    else {
        res.status(404).json({ message: 'No existe el campo' });
    }
});
exports.mostrarCampo = mostrarCampo;
const agregarCampo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const conf = yield (0, configuracion_dta_1.getConfig)();
    if (body.area >= conf[0].dataValues.area_minima) {
        yield (0, campos_dta_1.postCampo)(req);
        res.status(200).json({ message: 'Campo agregado correctamente' });
    }
    else {
        res.status(400).json({ error: 'El área del campo es muy pequeña' });
    }
});
exports.agregarCampo = agregarCampo;
const editarCampo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const campo = yield (0, campos_dta_1.getCampo)(id);
    const conf = yield (0, configuracion_dta_1.getConfig)();
    if (campo !== null) {
        if (body.area >= conf[0].dataValues.area_minima) {
            yield (0, campos_dta_1.putCampo)(req);
            res.redirect('/campos/list');
        }
        else {
            const estados = yield (0, estados_dta_1.getEstadosForCampos)();
            const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
            const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
            const date = (0, date_controller_1.getDate)();
            res.render('fields_edit', { campo, date, usuario, rol, estados, error: '* El área del campo es muy pequeña' });
        }
    }
    else {
        res.status(404).json({ message: 'No existe el campo' });
    }
});
exports.editarCampo = editarCampo;
const editarFormaCampo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const campo = yield (0, campos_dta_1.getCampo)(id);
    if (campo !== null) {
        yield (0, campos_dta_1.putCampo)(req);
        res.status(200).json({ message: 'Forma editada correctamente' });
    }
    else {
        res.status(404).json({ message: 'No existe el campo' });
    }
});
exports.editarFormaCampo = editarFormaCampo;
const eliminarCampo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const campo = yield (0, campos_dta_1.getCampo)(id);
    if (campo !== null) {
        yield (0, campos_dta_1.deleteCampo)(id);
        res.redirect('/campos/list');
    }
    else {
        res.status(404).json({ message: 'No existe el campo' });
    }
});
exports.eliminarCampo = eliminarCampo;
const mostrarTrazado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        let campos;
        const date = (0, date_controller_1.getDate)();
        const cultivos = yield (0, cultivos_dta_1.getCultivosActivos)();
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
        if ((usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario) != 1) {
            campos = yield (0, campos_dta_1.getCampos)(req.session.user);
        }
        else {
            campos = yield (0, campos_dta_1.getCamposActivos)();
        }
        const estados = yield (0, estados_dta_1.getEstadosActivos)();
        const config = yield (0, configuracion_dta_1.getConfig)();
        const usuarios = yield (0, usuarios_dta_1.getUsuariosActivos)();
        res.render('traced', { date, usuario, rol, cultivos, campos, estados, usuarios, config });
    }
    else {
        res.render('login', { error: '' });
    }
});
exports.mostrarTrazado = mostrarTrazado;
const cancelarEditarCampo = (req, res) => {
    res.redirect('/campos/list');
};
exports.cancelarEditarCampo = cancelarEditarCampo;
//# sourceMappingURL=campos_controller.js.map