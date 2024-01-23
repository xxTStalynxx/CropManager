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
exports.dataCalendar = exports.showCalendar = void 0;
const date_controller_1 = require("../processes/date_controller");
const usuarios_dta_1 = require("../../data_access/usuarios_dta");
const roles_dta_1 = require("../../data_access/roles_dta");
const siembras_dta_1 = require("../../data_access/siembras_dta");
const campos_dta_1 = require("../../data_access/campos_dta");
const cultivos_dta_1 = require("../../data_access/cultivos_dta");
const showCalendar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        const date = (0, date_controller_1.getDate)();
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
        res.render('calendar', { usuario, date, rol });
    }
    else {
        res.render('login', { error: '' });
    }
});
exports.showCalendar = showCalendar;
const dataCalendar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
    let actividades = [];
    if ((usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario) != 1) {
        const campos = yield (0, campos_dta_1.getCampos)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.id);
        if (campos.length > 0) {
            for (let i = 0; i < campos.length; i++) {
                const actividad = yield (0, siembras_dta_1.getSiembrasPorUsuario)(campos[i].dataValues.id);
                actividades = actividades.concat(actividad);
            }
        }
    }
    else {
        actividades = yield (0, siembras_dta_1.getSiembras)();
    }
    let siembra = {
        "title": '',
        "start": ''
    };
    let cosecha = {
        "title": '',
        "start": ''
    };
    let data = [];
    if (actividades.length > 0) {
        for (let i = 0; i < actividades.length; i++) {
            const campo = yield (0, campos_dta_1.getNombreCampo)(actividades[i].dataValues.id_campo);
            const cultivo = yield (0, cultivos_dta_1.getNombreCultivo)(actividades[i].dataValues.id_cultivo);
            actividades[i].dataValues.nomCampo = campo;
            actividades[i].dataValues.nomCultivo = cultivo;
        }
        actividades.forEach(actividades => {
            siembra = { "title": '', "start": '' };
            siembra['title'] = actividades.dataValues.nomCampo + ": Siembra de " + actividades.dataValues.nomCultivo;
            siembra['start'] = actividades.dataValues.fecha_siembra;
            data.push(siembra);
            cosecha = { "title": '', "start": '' };
            cosecha['title'] = actividades.dataValues.nomCampo + ": Cosecha de " + actividades.dataValues.nomCultivo;
            cosecha['start'] = actividades.dataValues.fecha_cosecha_est;
            data.push(cosecha);
        });
    }
    res.json(data);
});
exports.dataCalendar = dataCalendar;
//# sourceMappingURL=calendar_controller.js.map