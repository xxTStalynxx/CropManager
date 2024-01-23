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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCamposDeSiembras = exports.getProduccionPorCultivo = exports.searchSiembra = exports.deleteSiembra = exports.postSiembra = exports.getSiembrasPorCampo = exports.getSiembraByCampo = exports.getSiembra = exports.getSiembrasPorUsuario = exports.getSiembras = void 0;
const sequelize_1 = require("sequelize");
const siembra_1 = __importDefault(require("../models/siembra"));
const getSiembras = () => __awaiter(void 0, void 0, void 0, function* () {
    const siembras = yield siembra_1.default.findAll();
    return siembras;
});
exports.getSiembras = getSiembras;
const getSiembrasPorUsuario = (id_camp) => __awaiter(void 0, void 0, void 0, function* () {
    const siembras = yield siembra_1.default.findAll({
        where: { id_campo: id_camp }
    });
    return siembras;
});
exports.getSiembrasPorUsuario = getSiembrasPorUsuario;
const getSiembra = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const siembra = yield siembra_1.default.findByPk(id);
    if (siembra) {
        return siembra;
    }
    else {
        return null;
    }
});
exports.getSiembra = getSiembra;
const getSiembraByCampo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const siembra = yield siembra_1.default.findOne({
        where: { id_campo: id }
    });
    if (siembra) {
        return siembra;
    }
    else {
        return null;
    }
});
exports.getSiembraByCampo = getSiembraByCampo;
const getSiembrasPorCampo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const siembras = yield siembra_1.default.findAll({
        where: { id_campo: id },
        order: ['fecha_cosecha_est']
    });
    return siembras;
});
exports.getSiembrasPorCampo = getSiembrasPorCampo;
const postSiembra = (newSiembra) => __awaiter(void 0, void 0, void 0, function* () {
    const siembra = yield siembra_1.default.create({
        id_campo: newSiembra.id_campo,
        id_cultivo: newSiembra.id_cultivo,
        fecha_siembra: newSiembra.fecha_siembra,
        produccion_estimada: newSiembra.produccion_estimada,
        fecha_cosecha_est: newSiembra.fecha_cosecha_est,
    });
    yield siembra.save();
});
exports.postSiembra = postSiembra;
const deleteSiembra = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const siembra = yield siembra_1.default.findByPk(id);
    if (siembra) {
        yield siembra.destroy();
    }
});
exports.deleteSiembra = deleteSiembra;
const searchSiembra = (campo) => __awaiter(void 0, void 0, void 0, function* () {
    const siembra = yield siembra_1.default.findOne({
        where: { id_campo: campo },
    });
    if (siembra) {
        return true;
    }
    else {
        return false;
    }
});
exports.searchSiembra = searchSiembra;
const getProduccionPorCultivo = (id, year, month) => __awaiter(void 0, void 0, void 0, function* () {
    const siembras = yield siembra_1.default.findAll({
        attributes: [
            'id_cultivo',
            [sequelize_1.Sequelize.fn('SUM', sequelize_1.Sequelize.col('produccion_estimada')), 'total']
        ],
        where: {
            id_cultivo: id,
            [sequelize_1.Op.and]: sequelize_1.Sequelize.literal(`MONTH(fecha_cosecha_est) = ${month}`),
            fecha_cosecha_est: {
                [sequelize_1.Op.between]: [new Date(`${year}-01-01`), new Date(`${year}-12-31`)]
            }
        },
        group: ['id_cultivo']
    });
    return siembras;
});
exports.getProduccionPorCultivo = getProduccionPorCultivo;
const getCamposDeSiembras = (id, date) => __awaiter(void 0, void 0, void 0, function* () {
    const siembras = yield siembra_1.default.findAll({
        attributes: [
            'id_campo',
        ],
        where: {
            id_cultivo: id,
            fecha_siembra: {
                [sequelize_1.Op.lte]: date
            },
            fecha_cosecha_est: {
                [sequelize_1.Op.gte]: date
            }
        },
        group: ['id_campo']
    });
    return siembras;
});
exports.getCamposDeSiembras = getCamposDeSiembras;
//# sourceMappingURL=siembras_dta.js.map