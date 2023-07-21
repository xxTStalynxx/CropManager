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
exports.getCamposStatsChart = exports.showDashboard = void 0;
const date_controller_1 = require("../processes/date_controller");
const usuarios_dta_1 = require("../../data_access/usuarios_dta");
const roles_dta_1 = require("../../data_access/roles_dta");
const cultivos_dta_1 = require("../../data_access/cultivos_dta");
const campos_dta_1 = require("../../data_access/campos_dta");
const registros_dta_1 = require("../../data_access/registros_dta");
const campos_dta_2 = require("../../data_access/campos_dta");
const estados_dta_1 = require("../../data_access/estados_dta");
const showDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        const date = (0, date_controller_1.getDate)();
        const stats = yield getStats(req.session.user);
        const estados = yield getCamposStats(req.session.user);
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
        res.render('dashboard', { usuario, estados, date, rol, stats });
    }
    else {
        res.render('login', { error: '' });
    }
});
exports.showDashboard = showDashboard;
function getStats(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const numUsuarios = yield (0, usuarios_dta_1.countUsuarios)();
        const numCultivos = yield (0, cultivos_dta_1.countCultivos)();
        let numCampos;
        const usuario = yield (0, usuarios_dta_1.getUsuario)(id);
        if ((usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario) != 1) {
            numCampos = yield (0, campos_dta_1.countCampos)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.id);
        }
        else {
            numCampos = yield (0, campos_dta_1.countAllCampos)();
        }
        const numRegistros = yield (0, registros_dta_1.countRegistros)();
        const stats = [
            { numUsuarios },
            { numCultivos },
            { numCampos },
            { numRegistros }
        ];
        return stats;
    });
}
function getCamposStats(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let estados = yield (0, estados_dta_1.getEstados)();
        const usuario = yield (0, usuarios_dta_1.getUsuario)(id);
        if (estados.length > 0) {
            for (let i = 0; i < estados.length; i++) {
                if ((usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario) != 1) {
                    estados[i].dataValues.numCampos = yield (0, campos_dta_2.getNumCamposByEstado)(estados[i].dataValues.id, usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.id);
                }
                else {
                    estados[i].dataValues.numCampos = yield (0, campos_dta_1.getNumAllCamposByEstado)(estados[i].dataValues.id);
                }
            }
        }
        return estados;
    });
}
const getCamposStatsChart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let estados = yield (0, estados_dta_1.getEstados)();
    const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
    if (estados.length > 0) {
        for (let i = 0; i < estados.length; i++) {
            if ((usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario) != 1) {
                estados[i].dataValues.numCampos = yield (0, campos_dta_2.getNumCamposByEstado)(estados[i].dataValues.id, usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.id);
            }
            else {
                estados[i].dataValues.numCampos = yield (0, campos_dta_1.getNumAllCamposByEstado)(estados[i].dataValues.id);
            }
        }
    }
    res.json(estados);
});
exports.getCamposStatsChart = getCamposStatsChart;
//# sourceMappingURL=panel_controller.js.map