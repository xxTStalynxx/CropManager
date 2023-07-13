"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../database/connect"));
const Cultivo_salida = connect_1.default.define('cultivos_salida', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    id_cultivo: {
        type: sequelize_1.DataTypes.INTEGER
    },
    cantidad: {
        type: sequelize_1.DataTypes.DECIMAL
    }
});
exports.default = Cultivo_salida;
//# sourceMappingURL=cultivo_salida.js.map