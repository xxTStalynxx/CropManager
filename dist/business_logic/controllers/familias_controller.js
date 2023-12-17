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
exports.cancelarEditarFamilia = exports.restaurarFamilia = exports.eliminarFamilia = exports.editarFamilia = exports.agregarFamilia = exports.buscarFamilia = exports.listarFamilias = void 0;
const familias_dta_1 = require("../../data_access/familias.dta");
const date_controller_1 = require("../processes/date_controller");
const usuarios_dta_1 = require("../../data_access/usuarios_dta");
const roles_dta_1 = require("../../data_access/roles_dta");
const listarFamilias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        if ((usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario) != 1) {
            res.render('noauth');
        }
        else {
            const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
            const familias = yield (0, familias_dta_1.getFamilias)();
            const date = (0, date_controller_1.getDate)();
            res.render('families', { familias, date, usuario, rol, error: '' });
        }
    }
    else {
        res.render('login', { error: '' });
    }
});
exports.listarFamilias = listarFamilias;
const buscarFamilia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        const { id } = req.params;
        const familia = yield (0, familias_dta_1.getFamilia)(id);
        const date = (0, date_controller_1.getDate)();
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
        if (familia !== null) {
            res.render('families_edit', { familia, date, usuario, rol, error: '' });
        }
        else {
            res.status(404).json({ message: 'No existe la familia' });
        }
    }
    else {
        res.render('login', { error: '' });
    }
});
exports.buscarFamilia = buscarFamilia;
const agregarFamilia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    if (yield (0, familias_dta_1.searchFamilia)(body.nombre)) {
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
        const familias = yield (0, familias_dta_1.getFamilias)();
        const date = (0, date_controller_1.getDate)();
        res.render('families', { familias, date, usuario, rol, error: '* La familia de cultivos ya existe' });
    }
    else {
        yield (0, familias_dta_1.postFamilia)(req);
        res.redirect('/familias');
    }
});
exports.agregarFamilia = agregarFamilia;
const editarFamilia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const familia = yield (0, familias_dta_1.getFamilia)(id);
    if (familia !== null) {
        if (body.nombre != familia.dataValues.nombre) {
            if (yield (0, familias_dta_1.searchFamilia)(body.nombre)) {
                const date = (0, date_controller_1.getDate)();
                const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
                const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
                res.render('families_edit', { familia, date, usuario, rol, error: '* Familia de cultivo ya registrada' });
            }
            else {
                yield (0, familias_dta_1.putFamilia)(req);
                res.redirect('/familias');
            }
        }
        else {
            yield (0, familias_dta_1.putFamilia)(req);
            res.redirect('/familias');
        }
    }
    else {
        res.status(404).json({ message: 'No existe la familia' });
    }
});
exports.editarFamilia = editarFamilia;
const eliminarFamilia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const familia = yield (0, familias_dta_1.getFamilia)(id);
    if (familia !== null) {
        yield (0, familias_dta_1.deleteFamilia)(id);
        res.redirect('/familias');
    }
    else {
        res.status(404).json({ message: 'No existe la familia' });
    }
});
exports.eliminarFamilia = eliminarFamilia;
const restaurarFamilia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const familia = yield (0, familias_dta_1.getFamilia)(id);
    if (familia !== null) {
        yield (0, familias_dta_1.restoreFamilia)(id);
        res.redirect('/familias');
    }
    else {
        res.status(404).json({ message: 'No existe la familia' });
    }
});
exports.restaurarFamilia = restaurarFamilia;
const cancelarEditarFamilia = (req, res) => {
    res.redirect('/familias');
};
exports.cancelarEditarFamilia = cancelarEditarFamilia;
//# sourceMappingURL=familias_controller.js.map