import { BOOLEAN, DataTypes } from "sequelize";
import db from "../database/connect";

const Registro = db.define('registros', {
    campo: {
        type: DataTypes.INTEGER
    },
    cultivo: {
        type: DataTypes.INTEGER
    },
    cantidad: {
        type: DataTypes.DECIMAL
    },
    novedades: {
        type: DataTypes.STRING
    },
    fecha_siembra: {
        type: DataTypes.DATE
    },
    fecha_cosecha: {
        type: DataTypes.DATE
    },
    activo: {
        type: DataTypes.BOOLEAN
    },
});

export default Registro;