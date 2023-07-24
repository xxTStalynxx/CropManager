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
exports.eliminarSiembra = exports.agregarSiembra = exports.buscarSiembra = exports.listarSiembras = void 0;
const siembras_dta_1 = require("../../data_access/siembras_dta");
const campos_dta_1 = require("../../data_access/campos_dta");
const cultivos_dta_1 = require("../../data_access/cultivos_dta");
const date_controller_1 = require("../processes/date_controller");
const estados_dta_1 = require("../../data_access/estados_dta");
const configuracion_dta_1 = require("../../data_access/configuracion_dta");
const listarSiembras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const siembras = yield (0, siembras_dta_1.getSiembras)();
    res.json(siembras);
});
exports.listarSiembras = listarSiembras;
const buscarSiembra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const siembra = yield (0, siembras_dta_1.getSiembraByCampo)(id);
    const campo = yield (0, campos_dta_1.getCampo)(id);
    const estado = yield (0, estados_dta_1.getNombreEstado)(campo === null || campo === void 0 ? void 0 : campo.dataValues.estado);
    const cultivo = yield (0, cultivos_dta_1.getCultivo)(siembra === null || siembra === void 0 ? void 0 : siembra.dataValues.id_cultivo);
    const data = {
        id: siembra === null || siembra === void 0 ? void 0 : siembra.dataValues.id,
        campo: campo === null || campo === void 0 ? void 0 : campo.dataValues.nombre,
        estado: estado,
        cultivo: cultivo === null || cultivo === void 0 ? void 0 : cultivo.dataValues.nombre,
        fecha_siembra: siembra === null || siembra === void 0 ? void 0 : siembra.dataValues.fecha_siembra,
        produccion_estimada: siembra === null || siembra === void 0 ? void 0 : siembra.dataValues.produccion_estimada,
        fecha_cosecha_est: siembra === null || siembra === void 0 ? void 0 : siembra.dataValues.fecha_cosecha_est
    };
    if (siembra !== null) {
        res.json(data);
    }
    else {
        res.status(404).json({ message: 'No existe la siembra' });
    }
});
exports.buscarSiembra = buscarSiembra;
const agregarSiembra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    if (yield (0, siembras_dta_1.searchSiembra)(body.id_campo)) {
        res.status(404).json({ message: 'No se pueden agregar 2 siembras en el mismo campo' });
    }
    else {
        const prod_est = yield produccionEstimada(body.id_cultivo, body.id_campo);
        const fecha_est = yield (0, date_controller_1.fechaEstimada)(body.fecha_siembra, body.id_cultivo);
        let newSimbra = {
            id_campo: body.id_campo,
            id_cultivo: body.id_cultivo,
            fecha_siembra: body.fecha_siembra,
            produccion_estimada: prod_est,
            fecha_cosecha_est: fecha_est
        };
        yield (0, siembras_dta_1.postSiembra)(newSimbra);
        const conf = yield (0, configuracion_dta_1.getConfig)();
        yield (0, campos_dta_1.changeEstado)(body.id_campo, conf[0].dataValues.campo_sembrado);
        res.status(200).json({ message: 'Siembra agregada correctamente' });
    }
});
exports.agregarSiembra = agregarSiembra;
const eliminarSiembra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const siembra = yield (0, siembras_dta_1.getSiembra)(id);
    if (siembra !== null) {
        const conf = yield (0, configuracion_dta_1.getConfig)();
        yield (0, campos_dta_1.changeEstado)(siembra.dataValues.id_campo, conf[0].dataValues.campo_vacio);
        yield (0, siembras_dta_1.deleteSiembra)(id);
        res.redirect('/trazado');
    }
    else {
        res.status(404).json({ message: 'No existe la siembra' });
    }
});
exports.eliminarSiembra = eliminarSiembra;
function produccionEstimada(id_cult, id_camp) {
    return __awaiter(this, void 0, void 0, function* () {
        const cultivo = yield (0, cultivos_dta_1.getCultivo)(id_cult);
        const campo = yield (0, campos_dta_1.getCampo)(id_camp);
        return (cultivo === null || cultivo === void 0 ? void 0 : cultivo.dataValues.productividad) * (campo === null || campo === void 0 ? void 0 : campo.dataValues.area);
    });
}
//# sourceMappingURL=siembras_controller.js.map