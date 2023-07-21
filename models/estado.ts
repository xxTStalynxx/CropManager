import { DataTypes } from "sequelize";
import db from "../database/connect";
import Campo from "./campo";

const Estado = db.define('estados',{
    nombre:{
        type:DataTypes.STRING
    },
    descripcion:{
        type:DataTypes.STRING
    },
    activo:{
        type:DataTypes.BOOLEAN
    },
});

export default Estado;