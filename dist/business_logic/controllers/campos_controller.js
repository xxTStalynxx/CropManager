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
exports.mostrarTrazado = exports.eliminarCampo = exports.editarCampo = exports.agregarCampo = exports.buscarCampo = exports.listarCampos = exports.mostrarCampos = void 0;
const campos_dta_1 = require("../../data_access/campos_dta");
const parameters_1 = require("../validations/parameters");
const date_controller_1 = require("../processes/date_controller");
const usuarios_dta_1 = require("../../data_access/usuarios_dta");
const roles_dta_1 = require("../../data_access/roles_dta");
const cultivos_dta_1 = require("../../data_access/cultivos_dta");
const estados_dta_1 = require("../../data_access/estados_dta");
const mostrarCampos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const campos = yield (0, campos_dta_1.getCampos)(req.session.user);
    res.json(campos);
});
exports.mostrarCampos = mostrarCampos;
const listarCampos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
        let campos;
        let encargado;
        if ((usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario) != 1) {
            campos = yield (0, campos_dta_1.getCampos)(req.session.user);
        }
        else {
            campos = yield (0, campos_dta_1.getAllCampos)();
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
        res.render('fields', { campos, date, usuario, rol });
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
        res.json(campo);
    }
    else {
        res.status(404).json({ message: 'No existe el campo' });
    }
});
exports.buscarCampo = buscarCampo;
const agregarCampo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    if (body.area >= (0, parameters_1.getArea)()) {
        yield (0, campos_dta_1.postCampo)(req);
        res.status(200).json({ message: 'Campo agregado correctamente' });
    }
    else {
        res.status(400).json({ error: 'El área del campo no cumple con los requisitos' });
    }
});
exports.agregarCampo = agregarCampo;
const editarCampo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const campo = yield (0, campos_dta_1.getCampo)(id);
    if (campo !== null) {
        if (body.area >= (0, parameters_1.getArea)()) {
            yield (0, campos_dta_1.putCampo)(req);
            res.status(200).json({ message: 'Campo actualizado correctamente' });
        }
        else {
            res.status(404).json({ message: 'El área del campo no cumple con los requisitos' });
        }
    }
    else {
        res.status(404).json({ message: 'No existe el campo' });
    }
});
exports.editarCampo = editarCampo;
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
        const date = (0, date_controller_1.getDate)();
        const cultivos = yield (0, cultivos_dta_1.getCultivosforCampos)();
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
        res.render('traced', { date, usuario, rol, cultivos });
    }
    else {
        res.render('login', { error: '' });
    }
});
exports.mostrarTrazado = mostrarTrazado;
//# sourceMappingURL=campos_controller.js.map