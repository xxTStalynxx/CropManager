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
exports.getSumaProduccion = exports.getAllSumaProduccion = exports.countRegistros = exports.countAllRegistros = exports.searchRegistro = exports.deleteRegistro = exports.postRegistro = exports.getRegistro = exports.getRegistros = exports.getAllRegistros = void 0;
const registro_1 = __importDefault(require("../models/registro"));
const sequelize_1 = require("sequelize");
const getAllRegistros = () => __awaiter(void 0, void 0, void 0, function* () {
    const registros = yield registro_1.default.findAll();
    return registros;
});
exports.getAllRegistros = getAllRegistros;
const getRegistros = (campo) => __awaiter(void 0, void 0, void 0, function* () {
    const registros = yield registro_1.default.findAll({
        where: { campo: campo }
    });
    return registros;
});
exports.getRegistros = getRegistros;
const getRegistro = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const registro = yield registro_1.default.findByPk(id);
    if (registro) {
        return registro;
    }
    else {
        return null;
    }
});
exports.getRegistro = getRegistro;
const postRegistro = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const registro = yield registro_1.default.create({
        campo: body.campo,
        cultivo: body.cultivo,
        cantidad: body.cantidad,
        novedades: body.novedades,
        fecha_siembra: body.fecha_siembra,
        fecha_cosecha: body.fecha_cosecha,
    });
    yield registro.save();
});
exports.postRegistro = postRegistro;
const deleteRegistro = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const registro = yield registro_1.default.findByPk(id);
    if (registro) {
        yield registro.destroy();
    }
});
exports.deleteRegistro = deleteRegistro;
const searchRegistro = (campo) => __awaiter(void 0, void 0, void 0, function* () {
    const registro = yield registro_1.default.findOne({
        where: { campo: campo },
    });
    if (registro) {
        return true;
    }
    else {
        return false;
    }
});
exports.searchRegistro = searchRegistro;
const countAllRegistros = () => __awaiter(void 0, void 0, void 0, function* () {
    const nr = registro_1.default.count();
    return nr;
});
exports.countAllRegistros = countAllRegistros;
const countRegistros = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const nc = registro_1.default.count({
        where: { campo: id }
    });
    return nc;
});
exports.countRegistros = countRegistros;
const getAllSumaProduccion = (id, year) => __awaiter(void 0, void 0, void 0, function* () {
    const suma = yield registro_1.default.sum('cantidad', {
        where: {
            cultivo: id,
            fecha_cosecha: {
                [sequelize_1.Op.between]: [new Date(`${year}-01-01`), new Date(`${year}-12-31`)]
            }
        }
    });
    return suma;
});
exports.getAllSumaProduccion = getAllSumaProduccion;
const getSumaProduccion = (cultivo, year, campo) => __awaiter(void 0, void 0, void 0, function* () {
    const suma = yield registro_1.default.sum('cantidad', {
        where: {
            cultivo: cultivo,
            campo: campo,
            fecha_cosecha: {
                [sequelize_1.Op.between]: [new Date(`${year}-01-01`), new Date(`${year}-12-31`)]
            }
        }
    });
    return suma;
});
exports.getSumaProduccion = getSumaProduccion;
//# sourceMappingURL=registros_dta.js.map