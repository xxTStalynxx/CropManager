import { DataTypes } from "sequelize";
import db from "../database/connect";

const Familia = db.define('familias',{
    nombre:{
        type:DataTypes.STRING
    },
    exigencia_organica:{
        type:DataTypes.INTEGER
    },
    descripcion:{
        type:DataTypes.STRING
    },
    activo:{
        type:DataTypes.BOOLEAN
    }
});

export default Familia;