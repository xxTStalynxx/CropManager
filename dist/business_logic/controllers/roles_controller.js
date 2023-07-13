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
exports.cancelarEditarRol = exports.restaurarRol = exports.eliminarRol = exports.editarRol = exports.agregarRol = exports.buscarRol = exports.listarRoles = void 0;
const roles_dta_1 = require("../../data_access/roles_dta");
const date_controller_1 = require("../processes/date_controller");
const usuarios_dta_1 = require("../../data_access/usuarios_dta");
const listarRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        if ((usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario) != 1) {
            res.render('noauth');
        }
        else {
            const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
            const roles = yield (0, roles_dta_1.getRoles)();
            const date = (0, date_controller_1.getDate)();
            res.render('roles', { roles, date, usuario, rol, error: '' });
        }
    }
    else {
        res.render('login', { error: '' });
    }
});
exports.listarRoles = listarRoles;
const buscarRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        const { id } = req.params;
        const rol = yield (0, roles_dta_1.getRol)(id);
        const date = (0, date_controller_1.getDate)();
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        const rolusuario = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
        if (rol !== null) {
            res.render('roles_edit', { rol, date, usuario, rolusuario, error: '' });
        }
        else {
            res.status(404).json({ message: 'No existe el rol' });
        }
    }
    else {
        res.render('login', { error: '' });
    }
});
exports.buscarRol = buscarRol;
const agregarRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    if (yield (0, roles_dta_1.searchRol)(body.nombre)) {
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
        const roles = yield (0, roles_dta_1.getRoles)();
        const date = (0, date_controller_1.getDate)();
        res.render('roles', { roles, date, usuario, rol, error: '* El rol ya existe' });
    }
    else {
        yield (0, roles_dta_1.postRol)(req);
        res.redirect('/roles');
    }
});
exports.agregarRol = agregarRol;
const editarRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const rol = yield (0, roles_dta_1.getRol)(id);
    if (rol !== null) {
        if (body.nombre != rol.dataValues.nombre) {
            if (yield (0, roles_dta_1.searchRol)(body.nombre)) {
                const date = (0, date_controller_1.getDate)();
                const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
                const rolusuario = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
                res.render('roles_edit', { rol, date, usuario, rolusuario, error: '* Rol ya registrado' });
            }
            else {
                yield (0, roles_dta_1.putRol)(req);
                res.redirect('/roles');
            }
        }
        else {
            yield (0, roles_dta_1.putRol)(req);
            res.redirect('/roles');
        }
    }
    else {
        res.status(404).json({ message: 'No existe el rol' });
    }
});
exports.editarRol = editarRol;
const eliminarRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const rol = yield (0, roles_dta_1.getRol)(id);
    if (rol !== null) {
        yield (0, roles_dta_1.deleteRol)(id);
        res.redirect('/roles');
    }
    else {
        res.status(404).json({ message: 'No existe el rol' });
    }
});
exports.eliminarRol = eliminarRol;
const restaurarRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const rol = yield (0, roles_dta_1.getRol)(id);
    if (rol !== null) {
        yield (0, roles_dta_1.restoreRol)(id);
        res.redirect('/roles');
    }
    else {
        res.status(404).json({ message: 'No existe el rol' });
    }
});
exports.restaurarRol = restaurarRol;
const cancelarEditarRol = (req, res) => {
    res.redirect('/roles');
};
exports.cancelarEditarRol = cancelarEditarRol;
//# sourceMappingURL=roles_controller.js.map