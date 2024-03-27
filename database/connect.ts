import { Sequelize } from "sequelize";
import { DB_HOST, DB_NAME, DB_PASS, DB_USER } from "./config";

const db = new Sequelize(DB_NAME, DB_USER, DB_PASS,{
    host: DB_HOST,
    dialect: 'mysql'
})
// const db = new Sequelize('dbmanager','postgres','admin',{
//         host:'localhost',
//         dialect:'postgres'
    
//     })

export default db;