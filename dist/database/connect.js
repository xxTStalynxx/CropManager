"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('dbmanager', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
// const db = new Sequelize('dbmanager','postgres','admin',{
//         host:'localhost',
//         dialect:'postgres'
//     })
exports.default = db;
//# sourceMappingURL=connect.js.map