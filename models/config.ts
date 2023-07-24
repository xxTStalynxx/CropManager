import { DataTypes } from "sequelize";
import db from "../database/connect";

const Config = db.define('configs',{
    area_minima:{
        type:DataTypes.INTEGER
    },
    campo_vacio:{
        type:DataTypes.INTEGER
    },
    campo_sembrado:{
        type:DataTypes.INTEGER
    }
});

export default Config;