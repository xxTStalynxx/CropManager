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
exports.getActividadEstado = exports.getNombreEstado = exports.searchEstado = exports.restoreEstado = exports.deleteEstado = exports.putEstado = exports.postEstado = exports.getEstado = exports.getEstadosForCampos = exports.getActividades = exports.getEstadosActivos = exports.getEstados = void 0;
const estado_1 = __importDefault(require("../models/estado"));
const sequelize_1 = require("sequelize");
const getEstados = () => __awaiter(void 0, void 0, void 0, function* () {
    const estados = yield estado_1.default.findAll();
    return estados;
});
exports.getEstados = getEstados;
const getEstadosActivos = () => __awaiter(void 0, void 0, void 0, function* () {
    const estados = yield estado_1.default.findAll({
        where: { activo: true }
    });
    return estados;
});
exports.getEstadosActivos = getEstadosActivos;
const getActividades = (libre, sembrado) => __awaiter(void 0, void 0, void 0, function* () {
    const estados = yield estado_1.default.findAll({
        where: { id: { [sequelize_1.Op.and]: [{ [sequelize_1.Op.ne]: libre }, { [sequelize_1.Op.ne]: sembrado }] },
            activo: true,
        }
    });
    return estados;
});
exports.getActividades = getActividades;
const getEstadosForCampos = () => __awaiter(void 0, void 0, void 0, function* () {
    const estados = yield estado_1.default.findAll({
        where: { id: { [sequelize_1.Op.ne]: 2 } }
    });
    return estados;
});
exports.getEstadosForCampos = getEstadosForCampos;
const getEstado = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const estado = yield estado_1.default.findByPk(id);
    if (estado) {
        return estado;
    }
    else {
        return null;
    }
});
exports.getEstado = getEstado;
const postEstado = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const estado = yield estado_1.default.create({
        nombre: body.nombre,
        actividad: body.actividad,
        color: body.color,
    });
    yield estado.save();
});
exports.postEstado = postEstado;
const putEstado = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const estado = yield estado_1.default.findByPk(id);
    if (estado) {
        yield estado.update(body);
    }
});
exports.putEstado = putEstado;
const deleteEstado = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const estado = yield estado_1.default.findByPk(id);
    if (estado) {
        yield estado.update({ activo: false });
    }
});
exports.deleteEstado = deleteEstado;
const restoreEstado = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const estado = yield estado_1.default.findByPk(id);
    if (estado) {
        yield estado.update({ activo: true });
    }
});
exports.restoreEstado = restoreEstado;
const searchEstado = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    const estado = yield estado_1.default.findOne({
        where: { nombre: nombre },
    });
    if (estado) {
        return true;
    }
    else {
        return false;
    }
});
exports.searchEstado = searchEstado;
const getNombreEstado = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const estado = yield estado_1.default.findByPk(id);
    if (estado) {
        return estado.dataValues.nombre;
    }
});
exports.getNombreEstado = getNombreEstado;
const getActividadEstado = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const estado = yield estado_1.default.findByPk(id);
    if (estado) {
        return estado.dataValues.actividad;
    }
});
exports.getActividadEstado = getActividadEstado;
//# sourceMappingURL=estados_dta.js.map