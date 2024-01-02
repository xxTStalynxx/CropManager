import { Request } from "express";
import Estado from "../models/estado";
import { Op } from "sequelize";

export const getEstados = async () => {
    const estados = await Estado.findAll();
    return estados;
}

export const getEstadosActivos = async () => {
    const estados = await Estado.findAll({
        where: { activo: true }
    });
    return estados;
}

export const getActividades = async (libre: string, sembrado: string) => {
    const estados = await Estado.findAll({
        where: { id: { [Op.and]: [{ [Op.ne]: libre }, { [Op.ne]: sembrado} ] },
            activo: true,            
        }
    });
    return estados;
}

export const getEstadosForCampos = async () => {
    const estados = await Estado.findAll({
        where: { id: { [Op.ne]: 2 } }
    });
    return estados;
}

export const getEstado = async (id: string) => {
    const estado = await Estado.findByPk(id);
    if (estado) {
        return estado;
    } else {
        return null;
    }
}

export const postEstado = async (req: Request) => {
    const { body } = req;
    const estado = await Estado.create({
        nombre: body.nombre,
        actividad: body.actividad,
        color: body.color,
    })
    await estado.save();
}

export const putEstado = async (req: Request) => {
    const { body } = req;
    const { id } = req.params;
    const estado = await Estado.findByPk(id);
    if (estado) {
        await estado.update(body);
    }
}

export const deleteEstado = async (id: string) => {
    const estado = await Estado.findByPk(id);
    if (estado) {
        await estado.update({ activo: false });
    }
}

export const restoreEstado = async (id: string) => {
    const estado = await Estado.findByPk(id);
    if (estado) {
        await estado.update({ activo: true });
    }
}

export const searchEstado = async (nombre: string) => {
    const estado = await Estado.findOne({
        where: { nombre: nombre },
    });
    if (estado) {
        return true;
    } else {
        return false;
    }
}

export const getNombreEstado = async (id: string) => {
    const estado = await Estado.findByPk(id);
    if (estado) {
        return estado.dataValues.nombre;
    }
}

export const getActividadEstado = async (id: string) => {
    const estado = await Estado.findByPk(id);
    if (estado) {
        return estado.dataValues.actividad;
    }
}