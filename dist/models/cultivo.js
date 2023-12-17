"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../database/connect"));
const Cultivo = connect_1.default.define('cultivos', {
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    familia: {
        type: sequelize_1.DataTypes.INTEGER
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
    productividad: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    crecimiento: {
        type: sequelize_1.DataTypes.INTEGER
    },
    activo: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
});
exports.default = Cultivo;
//# sourceMappingURL=cultivo.js.map