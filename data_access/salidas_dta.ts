import { Request } from "express";
import Salida from "../models/salida";

export const getSalidas = async () => {
    const salidas = await Salida.findAll();
    return salidas;
}

export const getSalida = async (id: string) => {
    const salida = await Salida.findByPk(id);
    if (salida) {
        return salida;
    } else {
        return null;
    }
}

export const postSalida = async (req: Request) => {
    const { body } = req;
    const salida = await Salida.create({
        descripcion: body.descripcion,
        novedades: body.novedades,
    })
    await salida.save();
}

export const deleteSalida = async (id: string) => {
    const salida = await Salida.findByPk(id);
    if (salida) {
        await salida.update({ activo: false });
    } 
}