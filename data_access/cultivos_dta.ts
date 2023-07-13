import { Request } from "express";
import Cultivo from "../models/cultivo";

export const getCultivos = async () => {
    const cultivos = await Cultivo.findAll();
    return cultivos;
}

export const getCultivosforCampos = async () => {
    const cultivos = await Cultivo.findAll({
        where: { activo: true }
    });
    return cultivos;
}

export const getCultivo = async (id: string) => {
    const cultivo = await Cultivo.findByPk(id);
    if (cultivo) {
        return cultivo;
    } else {
        return null;
    }
}

export const postCultivo = async (req: Request) => {
    const { body } = req;
    const cultivo = await Cultivo.create({
        nombre: body.nombre,
        descripcion: body.descripcion,
        stock: body.stock,
    })
    await cultivo.save();
}

export const putCultivo = async (req: Request) => {
    const { body } = req;
    const { id } = req.params;
    const cultivo = await Cultivo.findByPk(id);
    if (cultivo){
        await cultivo.update(body);
    }
}

export const deleteCultivo = async (id: string) => {
    const cultivo = await Cultivo.findByPk(id);
    if (cultivo) {
        await cultivo.update({ activo: false });
    } 
}

export const restoreCultivo = async (id: string) => {
    const cultivo = await Cultivo.findByPk(id);
    if (cultivo) {
        await cultivo.update({ activo: true });
    } 
}

export const searchCultivo = async (nombre: string) => {
    const cultivo = await Cultivo.findOne({
        where: { nombre: nombre },
    });
    if (cultivo) {
        return true;
    } else {
        return false;
    }
}