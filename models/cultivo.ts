import { DataTypes } from "sequelize";
import db from "../database/connect";

const Cultivo = db.define('cultivos',{
    nombre:{
        type:DataTypes.STRING
    },
    descripcion:{
        type:DataTypes.STRING
    },
    productividad:{
        type:DataTypes.DECIMAL
    },
    precio:{
        type:DataTypes.DECIMAL
    },
    crecimiento:{
        type:DataTypes.INTEGER
    },
    activo:{
        type:DataTypes.BOOLEAN
    },
});

export default Cultivo;