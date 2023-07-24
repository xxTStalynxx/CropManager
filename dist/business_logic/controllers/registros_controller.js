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
exports.eliminarRegistro = exports.agregarRegistro = exports.buscarRegistro = exports.listarRegistros = void 0;
const registros_dta_1 = require("../../data_access/registros_dta");
const date_controller_1 = require("../processes/date_controller");
const usuarios_dta_1 = require("../../data_access/usuarios_dta");
const roles_dta_1 = require("../../data_access/roles_dta");
const siembras_dta_1 = require("../../data_access/siembras_dta");
const campos_dta_1 = require("../../data_access/campos_dta");
const cultivos_dta_1 = require("../../data_access/cultivos_dta");
const configuracion_dta_1 = require("../../data_access/configuracion_dta");
const listarRegistros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
        let registros = [];
        if ((usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario) != 1) {
            const campos = yield (0, campos_dta_1.getCampos)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.id);
            if (campos.length > 0) {
                for (let i = 0; i < campos.length; i++) {
                    const registro = yield (0, registros_dta_1.getRegistros)(campos[i].dataValues.id);
                    registros = registros.concat(registro);
                }
            }
        }
        else {
            registros = yield (0, registros_dta_1.getAllRegistros)();
        }
        const date = (0, date_controller_1.getDate)();
        for (let i = 0; i < registros.length; i++) {
            registros[i].dataValues.nomCampo = yield (0, campos_dta_1.getNombreCampo)(registros[i].dataValues.campo);
            registros[i].dataValues.nomCultivo = yield (0, cultivos_dta_1.getNombreCultivo)(registros[i].dataValues.cultivo);
        }
        res.render('records', { registros, date, usuario, rol });
    }
    else {
        res.render('login', { error: '' });
    }
});
exports.listarRegistros = listarRegistros;
const buscarRegistro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const registro = yield (0, registros_dta_1.getRegistro)(id);
    if (registro !== null) {
        res.json(registro);
    }
    else {
        res.status(404).json({ message: 'No existe el registro' });
    }
});
exports.buscarRegistro = buscarRegistro;
const agregarRegistro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const siembra = yield (0, siembras_dta_1.getSiembra)(body.id);
    let newRegistro = {
        campo: siembra === null || siembra === void 0 ? void 0 : siembra.dataValues.id_campo,
        cultivo: siembra === null || siembra === void 0 ? void 0 : siembra.dataValues.id_cultivo,
        cantidad: body.produccion,
        novedades: body.novedades,
        fecha_siembra: siembra === null || siembra === void 0 ? void 0 : siembra.dataValues.fecha_siembra,
        fecha_cosecha: body.fecha_cosecha
    };
    yield (0, registros_dta_1.postRegistro)(newRegistro);
    const conf = yield (0, configuracion_dta_1.getConfig)();
    yield (0, campos_dta_1.changeEstado)(siembra === null || siembra === void 0 ? void 0 : siembra.dataValues.id_campo, conf[0].dataValues.campo_vacio);
    yield (0, siembras_dta_1.deleteSiembra)(body.id);
    res.redirect('/trazado');
});
exports.agregarRegistro = agregarRegistro;
const eliminarRegistro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const registro = yield (0, registros_dta_1.getRegistro)(id);
    if (registro !== null) {
        yield (0, registros_dta_1.deleteRegistro)(id);
        res.redirect('/registros');
    }
    else {
        res.status(404).json({ message: 'No existe el registro' });
    }
});
exports.eliminarRegistro = eliminarRegistro;
//# sourceMappingURL=registros_controller.js.map