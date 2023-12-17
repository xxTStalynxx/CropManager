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
exports.restaurarCultivo = exports.cancelarEditarCultivo = exports.eliminarCultivo = exports.editarCultivo = exports.agregarCultivo = exports.buscarCultivo = exports.listarCultivos = void 0;
const cultivos_dta_1 = require("../../data_access/cultivos_dta");
const date_controller_1 = require("../processes/date_controller");
const usuarios_dta_1 = require("../../data_access/usuarios_dta");
const roles_dta_1 = require("../../data_access/roles_dta");
const familias_dta_1 = require("../../data_access/familias.dta");
const listarCultivos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        if ((usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario) != 1) {
            res.render('noauth');
        }
        else {
            const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
            const cultivos = yield (0, cultivos_dta_1.getCultivos)();
            const familias = yield (0, familias_dta_1.getFamiliasActivas)();
            const date = (0, date_controller_1.getDate)();
            res.render('crops', { cultivos, familias, date, usuario, rol, error: '' });
        }
    }
    else {
        res.render('login', { error: '' });
    }
});
exports.listarCultivos = listarCultivos;
const buscarCultivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        const { id } = req.params;
        const cultivo = yield (0, cultivos_dta_1.getCultivo)(id);
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
        const date = (0, date_controller_1.getDate)();
        if (cultivo !== null) {
            const familias = yield (0, familias_dta_1.getFamiliasActivas)();
            res.render('crops_edit', { cultivo, familias, date, usuario, rol, error: '' });
        }
        else {
            res.status(404).json({ message: 'No existe el cultivo' });
        }
    }
    else {
        res.render('login', { error: '' });
    }
});
exports.buscarCultivo = buscarCultivo;
const agregarCultivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    if (yield (0, cultivos_dta_1.searchCultivo)(body.nombre)) {
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
        const cultivos = yield (0, cultivos_dta_1.getCultivos)();
        const familias = yield (0, familias_dta_1.getFamiliasActivas)();
        const date = (0, date_controller_1.getDate)();
        res.render('crops', { cultivos, familias, date, usuario, rol, error: '* El cultivo ya existe' });
    }
    else {
        yield (0, cultivos_dta_1.postCultivo)(req);
        res.redirect('/cultivos');
    }
});
exports.agregarCultivo = agregarCultivo;
const editarCultivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const cultivo = yield (0, cultivos_dta_1.getCultivo)(id);
    if (cultivo !== null) {
        if (body.nombre != cultivo.dataValues.nombre) {
            if (yield (0, cultivos_dta_1.searchCultivo)(body.nombre)) {
                const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
                const familias = yield (0, familias_dta_1.getFamiliasActivas)();
                const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
                const date = (0, date_controller_1.getDate)();
                res.render('crops_edit', { cultivo, familias, date, usuario, rol, error: '* Cultivo ya registrado' });
            }
            else {
                yield (0, cultivos_dta_1.putCultivo)(req);
                res.redirect('/cultivos');
            }
        }
        else {
            yield (0, cultivos_dta_1.putCultivo)(req);
            res.redirect('/cultivos');
        }
    }
    else {
        res.status(404).json({ message: 'No existe el cultivo' });
    }
});
exports.editarCultivo = editarCultivo;
const eliminarCultivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cultivo = yield (0, cultivos_dta_1.getCultivo)(id);
    if (cultivo !== null) {
        yield (0, cultivos_dta_1.deleteCultivo)(id);
        res.redirect('/cultivos');
    }
    else {
        res.status(404).json({ message: 'No existe el cultivo' });
    }
});
exports.eliminarCultivo = eliminarCultivo;
const cancelarEditarCultivo = (req, res) => {
    res.redirect('/cultivos');
};
exports.cancelarEditarCultivo = cancelarEditarCultivo;
const restaurarCultivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cultivo = yield (0, cultivos_dta_1.getCultivo)(id);
    if (cultivo !== null) {
        yield (0, cultivos_dta_1.restoreCultivo)(id);
        res.redirect('/cultivos');
    }
    else {
        res.status(404).json({ message: 'No existe el cultivo' });
    }
});
exports.restaurarCultivo = restaurarCultivo;
//# sourceMappingURL=cultivos_controller.js.map