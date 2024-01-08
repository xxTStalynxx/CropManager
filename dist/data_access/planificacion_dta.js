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
exports.searchPlanificacion = exports.deletePlanificacion = exports.finishPlanificacion = exports.putPlanificacion = exports.postPlanificacion = exports.getActividadActual = exports.getActividad = exports.getPlanificacion = void 0;
const planificacion_1 = __importDefault(require("../models/planificacion"));
const sequelize_1 = require("sequelize");
const getPlanificacion = (id_campo) => __awaiter(void 0, void 0, void 0, function* () {
    const planificacion = yield planificacion_1.default.findAll({
        where: { id_campo: id_campo },
    });
    return planificacion;
});
exports.getPlanificacion = getPlanificacion;
const getActividad = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const actividad = yield planificacion_1.default.findByPk(id);
    if (actividad) {
        return actividad;
    }
    else {
        return null;
    }
});
exports.getActividad = getActividad;
const getActividadActual = (campo) => __awaiter(void 0, void 0, void 0, function* () {
    const actividad = yield planificacion_1.default.findOne({
        where: {
            id_campo: campo,
            activo: 1
        }
    });
    if (actividad) {
        return actividad;
    }
    else {
        return null;
    }
});
exports.getActividadActual = getActividadActual;
const postPlanificacion = (req, _activo) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const planificacion = yield planificacion_1.default.create({
        id_campo: body.id_campo,
        actividad: body.actividad,
        fecha_inicio: body.fecha_inicio,
        fecha_fin: body.fecha_fin,
        activo: _activo,
    });
    yield planificacion.save();
});
exports.postPlanificacion = postPlanificacion;
const putPlanificacion = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const planificacion = yield planificacion_1.default.findByPk(id);
    if (planificacion) {
        yield planificacion.update(body);
    }
});
exports.putPlanificacion = putPlanificacion;
const finishPlanificacion = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const planificacion = yield planificacion_1.default.findByPk(id);
    if (planificacion) {
        yield planificacion.update({ activo: 2 });
    }
});
exports.finishPlanificacion = finishPlanificacion;
const deletePlanificacion = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const planificacion = yield planificacion_1.default.findByPk(id);
    if (planificacion) {
        yield planificacion.destroy();
    }
});
exports.deletePlanificacion = deletePlanificacion;
const searchPlanificacion = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const planificacion = yield planificacion_1.default.findAll({
        where: { fecha_inicio: { [sequelize_1.Op.between]: [body.fecha_inicio, body.fecha_fin] },
            id_campo: body.id_campo,
        }
    });
    if (planificacion.length > 0) {
        return true;
    }
    else {
        return false;
    }
});
exports.searchPlanificacion = searchPlanificacion;
//# sourceMappingURL=planificacion_dta.js.map