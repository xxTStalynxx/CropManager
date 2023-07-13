import { Request } from "express";
import Registro from "../models/registro";

export const getRegistros = async () => {
    const registros = await Registro.findAll();
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

export const postRegistro = async (req: Request) => {
    const { body } = req;
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
        await registro.update({ activo: false });
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