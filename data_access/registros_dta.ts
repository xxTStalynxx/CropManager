import Registro from "../models/registro";
import { Op } from "sequelize";

export const getAllRegistros = async () => {
    const registros = await Registro.findAll();
    return registros;
}

export const getRegistros = async (campo: string) => {
    const registros = await Registro.findAll({
        where: { campo: campo }
    });
    return registros;
}

export const getRegistro = async (id: string) => {
    const registro = await Registro.findByPk(id);
    if (registro) {
        return registro;
    } else {
        return null;
    }
}

export const postRegistro = async (body: any) => {
    const registro = await Registro.create({
        campo: body.campo,
        cultivo: body.cultivo,
        cantidad: body.cantidad,
        novedades: body.novedades,
        fecha_siembra: body.fecha_siembra,
        fecha_cosecha: body.fecha_cosecha,
    });
    await registro.save();
}

export const deleteRegistro = async (id: string) => {
    const registro = await Registro.findByPk(id);
    if (registro) {
        await registro.destroy();
    } 
}

export const searchRegistro = async (campo: number) => {
    const registro = await Registro.findOne({
        where: { campo: campo },
    });
    if (registro) {
        return true;
    } else {
        return false;
    }
}

export const countAllRegistros = async () => {
    const nr = Registro.count();
    return nr;
}

export const countRegistros = async (id: string) => {
    const nc = Registro.count({
        where: { campo: id }
    });
    return nc;
}

export const getAllSumaProduccion = async (id: string, year: number) => {
    const suma = await Registro.sum('cantidad', {
        where: {
          cultivo: id,
          fecha_cosecha: {
            [Op.between]: [new Date(`${year}-01-01`), new Date(`${year}-12-31`)]
          }
        }
      })
    return suma;
}

export const getSumaProduccion = async (cultivo: string, year: number, campo: string) => {
    const suma = await Registro.sum('cantidad', {
        where: {
          cultivo: cultivo,
          campo: campo,
          fecha_cosecha: {
            [Op.between]: [new Date(`${year}-01-01`), new Date(`${year}-12-31`)]
          }
        }
      })
    return suma;
}