import { Request } from "express";
import Campo from "../models/campo";
import { Op } from "sequelize";

export const getCampos = async (idencargado: string) => {
    const campos = await Campo.findAll({
        where: {
            [Op.and]: [
                { encargado: idencargado },
                { activo: true }
            ]
        }
    });
    return campos;
}

export const getCampo = async (id: string) => {
    const campo = await Campo.findByPk(id);
    if (campo) {
        return campo;
    } else {
        return null;
    }
}

export const postCampo = async (req: Request) => {
    const { body } = req;
    const campo = await Campo.create({
        encargado: body.encargado,
        estado: body.estado,
        nombre: body.nombre,
        area: body.area,
        descripcion: body.descripcion,
        coordenadas: body.posiciones
    })
    await campo.save();
}

export const putCampo = async (req: Request) => {
    const { body } = req;
    const { id } = req.params;
    const campo = await Campo.findByPk(id);
    if (campo){
        await campo.update(body);
    }
}

export const deleteCampo = async (id: string) => {
    const campo = await Campo.findByPk(id);
    if (campo) {
        await campo.update({ activo: false });
    } 
}