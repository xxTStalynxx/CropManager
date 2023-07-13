import { Sequelize } from "sequelize";

const db = new Sequelize('dbmanager','root','',{
    host:'localhost',
    dialect:'mysql'

})
// const db = new Sequelize('dbmanager','postgres','admin',{
//         host:'localhost',
//         dialect:'postgres'
    
//     })

export default db;