"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../database/connect"));
const Planificacion = connect_1.default.define('planificaciones', {
    id_campo: {
        type: sequelize_1.DataTypes.INTEGER
    },
    actividad: {
        type: sequelize_1.DataTypes.INTEGER
    },
    fecha_inicio: {
        type: sequelize_1.DataTypes.DATE
    },
    fecha_fin: {
        type: sequelize_1.DataTypes.DATE
    },
    activo: {
        type: sequelize_1.DataTypes.INTEGER
    }
});
exports.default = Planificacion;
//# sourceMappingURL=planificacion.js.map