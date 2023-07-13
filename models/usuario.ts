import { DataTypes } from "sequelize";
import db from '../database/connect'

const Usuario = db.define('usuarios',{
    rol_usuario:{
        type:DataTypes.INTEGER
    },
    nombre:{
        type:DataTypes.STRING
    },
    correo:{
        type:DataTypes.STRING
    },
    contrasena:{
        type:DataTypes.STRING
    },
    activo:{
        type:DataTypes.BOOLEAN
    }
});

export default Usuario;