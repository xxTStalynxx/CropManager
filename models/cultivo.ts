import { DataTypes } from "sequelize";
import db from "../database/connect";

const Cultivo = db.define('cultivos',{
    nombre:{
        type:DataTypes.STRING
    },
    descripcion:{
        type:DataTypes.STRING
    },
    stock:{
        type:DataTypes.DECIMAL
    },
    activo:{
        type:DataTypes.BOOLEAN
    },
});

export default Cultivo;