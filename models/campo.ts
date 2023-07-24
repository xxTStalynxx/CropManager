import { DataTypes } from "sequelize";
import db from "../database/connect";

const Campo = db.define('campos',{
    encargado:{
        type:DataTypes.INTEGER
    },
    estado:{
        type:DataTypes.INTEGER
    },
    nombre:{
        type:DataTypes.STRING
    },
    descripcion:{
        type:DataTypes.STRING
    },
    area:{
        type:DataTypes.INTEGER
    },
    coordenadas:{
        type:DataTypes.TEXT
    },
    activo:{
        type:DataTypes.BOOLEAN
    }
});

export default Campo;