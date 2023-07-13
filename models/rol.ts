import { DataTypes } from "sequelize";
import db from '../database/connect'

const Rol = db.define('roles',{
    nombre:{
        type:DataTypes.STRING
    },
    descripcion:{
        type:DataTypes.STRING
    },
    activo:{
        type:DataTypes.BOOLEAN
    }
})

export default Rol