import { DataTypes } from "sequelize";
import db from "../database/connect";

const Cultivo_salida = db.define('cultivos_salida',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true
    },
    id_cultivo:{
        type:DataTypes.INTEGER
    },
    cantidad:{
        type:DataTypes.DECIMAL
    }
});

export default Cultivo_salida;