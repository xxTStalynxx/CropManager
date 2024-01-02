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
exports.searchFamilia = exports.restoreFamilia = exports.deleteFamilia = exports.putFamilia = exports.postFamilia = exports.getFamilia = exports.getFamiliasMenorExigencia = exports.getFamiliasPorExigencia = exports.getFamiliasActivas = exports.getFamilias = void 0;
const familia_1 = __importDefault(require("../models/familia"));
const sequelize_1 = require("sequelize");
const getFamilias = () => __awaiter(void 0, void 0, void 0, function* () {
    const familias = yield familia_1.default.findAll();
    return familias;
});
exports.getFamilias = getFamilias;
const getFamiliasActivas = () => __awaiter(void 0, void 0, void 0, function* () {
    const familias = yield familia_1.default.findAll({
        where: { activo: true },
    });
    return familias;
});
exports.getFamiliasActivas = getFamiliasActivas;
const getFamiliasPorExigencia = (exigencia) => __awaiter(void 0, void 0, void 0, function* () {
    const familias = yield familia_1.default.findAll({
        where: { exigencia_organica: exigencia },
    });
    return familias;
});
exports.getFamiliasPorExigencia = getFamiliasPorExigencia;
const getFamiliasMenorExigencia = (exigencia) => __awaiter(void 0, void 0, void 0, function* () {
    const familias = yield familia_1.default.findAll({
        where: {
            exigencia_organica: { [sequelize_1.Op.lte]: exigencia }
        }
    });
    return familias;
});
exports.getFamiliasMenorExigencia = getFamiliasMenorExigencia;
const getFamilia = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const familia = yield familia_1.default.findByPk(id);
    if (familia) {
        return familia;
    }
    else {
        return null;
    }
});
exports.getFamilia = getFamilia;
const postFamilia = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const familia = yield familia_1.default.create({
        nombre: body.nombre,
        exigencia_organica: body.exigencia_organica,
        descripcion: body.descripcion,
    });
    yield familia.save();
});
exports.postFamilia = postFamilia;
const putFamilia = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const familia = yield familia_1.default.findByPk(id);
    if (familia) {
        yield familia.update(body);
    }
});
exports.putFamilia = putFamilia;
const deleteFamilia = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const familia = yield familia_1.default.findByPk(id);
    if (familia) {
        yield familia.update({ activo: false });
    }
});
exports.deleteFamilia = deleteFamilia;
const restoreFamilia = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const familia = yield familia_1.default.findByPk(id);
    if (familia) {
        yield familia.update({ activo: true });
    }
});
exports.restoreFamilia = restoreFamilia;
const searchFamilia = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    const familia = yield familia_1.default.findOne({
        where: { nombre: nombre },
    });
    if (familia) {
        return true;
    }
    else {
        return false;
    }
});
exports.searchFamilia = searchFamilia;
//# sourceMappingURL=familias.dta.js.map