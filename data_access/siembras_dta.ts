import { Request } from "express";
import Siembra from "../models/siembra";

export const getSiembras = async () => {
    const siembras = await Siembra.findAll();
    return siembras;
}

export const getSiembra = async (id: string) => {
    const siembra = await Siembra.findByPk(id);
    if (siembra) {
        return siembra;
    } else {
        return null;
    }
}

export const postSiembra = async (req: Request) => {
    const { body } = req;
    const siembra = await Siembra.create({
        id_campo: body.id_campo,
        id_cultivo: body.id_cultivo,
        estado: body.estado,
        stock_estimado: body.stock_estimado,
        fecha_cosecha_est: body.fecha_cosecha_est,
    });
    await siembra.save();
}

export const deleteSiembra = async (id: string) => {
    const siembra = await Siembra.findByPk(id);
    if (siembra) {
        await siembra.destroy();
    } 
}

export const searchSiembra = async (campo: number) => {
    const siembra = await Siembra.findOne({
        where: { campo: campo },
    });
    if (siembra) {
        return true;
    } else {
        return false;
    }
}