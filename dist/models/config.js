"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../database/connect"));
const Config = connect_1.default.define('configs', {
    area_minima: {
        type: sequelize_1.DataTypes.INTEGER
    },
    campo_vacio: {
        type: sequelize_1.DataTypes.INTEGER
    },
    campo_sembrado: {
        type: sequelize_1.DataTypes.INTEGER
    }
});
exports.default = Config;
//# sourceMappingURL=config.js.map