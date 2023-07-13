import { Request } from "express";
import Estado from "../models/estado";

export const getEstados = async () => {
    const estados = await Estado.findAll();
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
        descripcion: body.descripcion,
    })
    await estado.save();
}

export const putEstado = async (req: Request) => {
    const { body } = req;
    const { id } = req.params;
    const estado = await Estado.findByPk(id);
    if (estado){
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