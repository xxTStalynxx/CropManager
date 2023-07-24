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
exports.searchSiembra = exports.deleteSiembra = exports.postSiembra = exports.getSiembraByCampo = exports.getSiembra = exports.getSiembrasbyUsuario = exports.getSiembras = void 0;
const siembra_1 = __importDefault(require("../models/siembra"));
const getSiembras = () => __awaiter(void 0, void 0, void 0, function* () {
    const siembras = yield siembra_1.default.findAll();
    return siembras;
});
exports.getSiembras = getSiembras;
const getSiembrasbyUsuario = (id_camp) => __awaiter(void 0, void 0, void 0, function* () {
    const siembras = yield siembra_1.default.findAll({
        where: { id_campo: id_camp }
    });
    return siembras;
});
exports.getSiembrasbyUsuario = getSiembrasbyUsuario;
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
//# sourceMappingURL=siembras_dta.js.map