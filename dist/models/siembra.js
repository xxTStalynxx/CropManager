"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../database/connect"));
const Siembra = connect_1.default.define('siembras', {
    id_campo: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_cultivo: {
        type: sequelize_1.DataTypes.INTEGER
    },
    estado: {
        type: sequelize_1.DataTypes.STRING
    },
    stock_estimado: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    fecha_cosecha_est: {
        type: sequelize_1.DataTypes.DATE
    },
});
exports.default = Siembra;
//# sourceMappingURL=siembra.js.map