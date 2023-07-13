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
exports.cancelarEditarEstado = exports.restaurarEstado = exports.eliminarEstado = exports.editarEstado = exports.agregarEstado = exports.buscarEstado = exports.listarEstados = void 0;
const estados_dta_1 = require("../../data_access/estados_dta");
const date_controller_1 = require("../processes/date_controller");
const usuarios_dta_1 = require("../../data_access/usuarios_dta");
const roles_dta_1 = require("../../data_access/roles_dta");
const listarEstados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        if ((usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario) != 1) {
            res.render('noauth');
        }
        else {
            const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
            const estados = yield (0, estados_dta_1.getEstados)();
            const date = (0, date_controller_1.getDate)();
            res.render('states', { estados, date, usuario, rol, error: '' });
        }
    }
    else {
        res.render('login', { error: '' });
    }
});
exports.listarEstados = listarEstados;
const buscarEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        const { id } = req.params;
        const estado = yield (0, estados_dta_1.getEstado)(id);
        const date = (0, date_controller_1.getDate)();
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
        if (estado !== null) {
            res.render('states_edit', { estado, date, usuario, rol, error: '' });
        }
        else {
            res.status(404).json({ message: 'No existe el estado' });
        }
    }
    else {
        res.render('login', { error: '' });
    }
});
exports.buscarEstado = buscarEstado;
const agregarEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    if (yield (0, estados_dta_1.searchEstado)(body.nombre)) {
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
        const estados = yield (0, estados_dta_1.getEstados)();
        const date = (0, date_controller_1.getDate)();
        res.render('states', { estados, date, usuario, rol, error: '* El estado ya existe' });
    }
    else {
        yield (0, estados_dta_1.postEstado)(req);
        res.redirect('/estados');
    }
});
exports.agregarEstado = agregarEstado;
const editarEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const estado = yield (0, estados_dta_1.getEstado)(id);
    if (estado !== null) {
        if (body.nombre != estado.dataValues.nombre) {
            if (yield (0, estados_dta_1.searchEstado)(body.nombre)) {
                const date = (0, date_controller_1.getDate)();
                const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
                const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
                res.render('states_edit', { estado, date, usuario, rol, error: '* Estado ya registrado' });
            }
            else {
                yield (0, estados_dta_1.putEstado)(req);
                res.redirect('/estados');
            }
        }
        else {
            yield (0, estados_dta_1.putEstado)(req);
            res.redirect('/estados');
        }
    }
    else {
        res.status(404).json({ message: 'No existe el estado' });
    }
});
exports.editarEstado = editarEstado;
const eliminarEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const estado = yield (0, estados_dta_1.getEstado)(id);
    if (estado !== null) {
        yield (0, estados_dta_1.deleteEstado)(id);
        res.redirect('/estados');
    }
    else {
        res.status(404).json({ message: 'No existe el estado' });
    }
});
exports.eliminarEstado = eliminarEstado;
const restaurarEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const estado = yield (0, estados_dta_1.getEstado)(id);
    if (estado !== null) {
        yield (0, estados_dta_1.restoreEstado)(id);
        res.redirect('/estados');
    }
    else {
        res.status(404).json({ message: 'No existe el estado' });
    }
});
exports.restaurarEstado = restaurarEstado;
const cancelarEditarEstado = (req, res) => {
    res.redirect('/estados');
};
exports.cancelarEditarEstado = cancelarEditarEstado;
//# sourceMappingURL=estados_controller.js.map