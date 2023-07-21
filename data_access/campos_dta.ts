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

export const getAllCampos = async () => {
    const campos = await Campo.findAll();
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
    if (campo) {
        await campo.update(body);
    }
}

export const deleteCampo = async (id: string) => {
    const campo = await Campo.findByPk(id);
    if (campo) {
        await campo.destroy();
    }
}

export const countCampos = async (id: string) => {
    const nc = Campo.count({
        where: { encargado: id }
    });
    return nc;
}

export const countAllCampos =async () => {
    const nc = Campo.count()
    return nc;
}

export const getNumAllCamposByEstado = async (estado: string) => {
    const num = Campo.findAll({
        where: {
            estado: estado,
        }
    });
    return (await num).length;
}

export const getNumCamposByEstado = async (estado: string, id: string) => {
    const num = Campo.findAll({
        where: {
            estado: estado,
            encargado: id,
        }
    });
    return (await num).length;
}

export const changeEstado = async (id: string) => {
    const nuevoE = {
        estado: 2,
    }
    const campo = await Campo.findByPk(id);
    if (campo) {
        await campo.update(nuevoE);
    }
}