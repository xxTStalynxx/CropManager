import { Request } from "express";
import Cultivo_salida from "../models/cultivo_salida";

export const getCultivo_salidas = async () => {
    const cultivo_salidas = await Cultivo_salida.findAll();
    return cultivo_salidas;
}

export const getCultivo_salida = async (id: string) => {
    const cultivo_salidas = await Cultivo_salida.findOne({
        where: { id: id },
    });
    if (cultivo_salidas) {
        return cultivo_salidas;
    } else {
        return null;
    }
}

export const postCultivo_salida = async (req: Request) => {
    const { body } = req;
    const cultivo_salida = await Cultivo_salida.create({
        id: body.id,
        id_cultivo: body.id_cultivo,
        cantidad: body.cantidad,
    });
    await cultivo_salida.save();
}