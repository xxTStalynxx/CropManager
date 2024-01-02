import { DataTypes } from "sequelize";
import db from "../database/connect";

const Planificacion = db.define('planificaciones',{
    id_campo:{
        type:DataTypes.INTEGER
    },
    actividad:{
        type:DataTypes.INTEGER
    },
    fecha_inicio:{
        type:DataTypes.DATE
    },
    fecha_fin:{
        type:DataTypes.DATE
    },
    activo:{
        type:DataTypes.INTEGER
    }
});

export default Planificacion;