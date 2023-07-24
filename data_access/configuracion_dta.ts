import { Request } from "express";
import Config from "../models/config";

export const getConfig = async () => {
    const config = await Config.findAll();
    return config;
}

export const postConfig = async (req: Request) => {
    const { body } = req;
    const config = await Config.create({
        area_minima: body.area_minima,
        campo_vacio: body.campo_vacio,
        campo_sembrado: body.campo_sembrado
    })
    await config.save();
}

export const putConfig = async (req: Request) => {
    const { body } = req;
    const config = await Config.findByPk(1);
    if (config) {
        await config.update(body);
    }
}