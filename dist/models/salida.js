"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../database/connect"));
const Salida = connect_1.default.define('salidas', {
    descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
    novedades: {
        type: sequelize_1.DataTypes.STRING
    },
    activo: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
});
exports.default = Salida;
//# sourceMappingURL=salida.js.map