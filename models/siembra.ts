import { DataTypes } from "sequelize";
import db from "../database/connect";

const Siembra = db.define('siembras',{
    id_campo:{
        type:DataTypes.INTEGER
    },
    id_cultivo:{
        type:DataTypes.INTEGER
    },
    fecha_siembra:{
        type:DataTypes.DATE
    },
    produccion_estimada:{
        type:DataTypes.DECIMAL
    },
    fecha_cosecha_est:{
        type:DataTypes.DATE
    },
});

export default Siembra;