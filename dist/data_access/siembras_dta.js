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
exports.searchSiembra = exports.deleteSiembra = exports.postSiembra = exports.getSiembra = exports.getSiembras = void 0;
const siembra_1 = __importDefault(require("../models/siembra"));
const getSiembras = () => __awaiter(void 0, void 0, void 0, function* () {
    const siembras = yield siembra_1.default.findAll();
    return siembras;
});
exports.getSiembras = getSiembras;
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
const postSiembra = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const siembra = yield siembra_1.default.create({
        id_campo: body.id_campo,
        id_cultivo: body.id_cultivo,
        estado: body.estado,
        stock_estimado: body.stock_estimado,
        fecha_cosecha_est: body.fecha_cosecha_est,
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
        where: { campo: campo },
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