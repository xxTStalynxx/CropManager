"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../database/connect"));
const Registro = connect_1.default.define('registros', {
    campo: {
        type: sequelize_1.DataTypes.INTEGER
    },
    cultivo: {
        type: sequelize_1.DataTypes.INTEGER
    },
    cantidad: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    novedades: {
        type: sequelize_1.DataTypes.STRING
    },
    fecha_siembra: {
        type: sequelize_1.DataTypes.DATE
    },
    fecha_cosecha: {
        type: sequelize_1.DataTypes.DATE
    },
    activo: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
});
exports.default = Registro;
//# sourceMappingURL=registro.js.map