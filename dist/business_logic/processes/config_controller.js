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
exports.editarConfig = exports.guardarConfig = exports.mostrarConfig = void 0;
const usuarios_dta_1 = require("../../data_access/usuarios_dta");
const roles_dta_1 = require("../../data_access/roles_dta");
const date_controller_1 = require("./date_controller");
const estados_dta_1 = require("../../data_access/estados_dta");
const configuracion_dta_1 = require("../../data_access/configuracion_dta");
const mostrarConfig = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        if ((usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario) != 1) {
            res.render('noauth');
        }
        else {
            const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
            const date = (0, date_controller_1.getDate)();
            const estados = yield (0, estados_dta_1.getEstadosActivos)();
            const config = yield (0, configuracion_dta_1.getConfig)();
            res.render('configuracion', { config, estados, date, usuario, rol, error: '' });
        }
    }
    else {
        res.render('login', { error: '' });
    }
});
exports.mostrarConfig = mostrarConfig;
const guardarConfig = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        if ((usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario) != 1) {
            res.render('noauth');
        }
        else {
            if (req.body.campo_vacio != req.body.campo_sembrado) {
                yield (0, configuracion_dta_1.postConfig)(req);
                res.redirect('/configuracion');
            }
            else {
                const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
                const date = (0, date_controller_1.getDate)();
                const estados = yield (0, estados_dta_1.getEstadosActivos)();
                const config = yield (0, configuracion_dta_1.getConfig)();
                res.render('configuracion', { config, estados, date, usuario, rol, error: '* Los estados deben ser diferentes' });
            }
        }
    }
    else {
        res.render('login', { error: '' });
    }
});
exports.guardarConfig = guardarConfig;
const editarConfig = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        if ((usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario) != 1) {
            res.render('noauth');
        }
        else {
            if (req.body.campo_vacio != req.body.campo_sembrado) {
                yield (0, configuracion_dta_1.putConfig)(req);
                res.redirect('/configuracion');
            }
            else {
                const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
                const date = (0, date_controller_1.getDate)();
                const estados = yield (0, estados_dta_1.getEstadosActivos)();
                const config = yield (0, configuracion_dta_1.getConfig)();
                res.render('configuracion', { config, estados, date, usuario, rol, error: '* Los estados deben ser diferentes' });
            }
        }
    }
    else {
        res.render('login', { error: '' });
    }
});
exports.editarConfig = editarConfig;
//# sourceMappingURL=config_controller.js.map