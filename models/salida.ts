import { BOOLEAN, DataTypes } from "sequelize";
import db from "../database/connect";

const Salida = db.define('salidas', {
    descripcion: {
        type: DataTypes.STRING
    },
    novedades: {
        type: DataTypes.STRING
    },
    activo: {
        type: DataTypes.BOOLEAN
        
    },
});

export default Salida;