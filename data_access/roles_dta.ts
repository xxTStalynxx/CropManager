import { Request } from "express";
import Rol from "../models/rol";

export const getRoles = async () => {
    const roles = await Rol.findAll();
    return roles;
}

export const getRolesforUsers = async () => {
    const roles = await Rol.findAll({
        where: { activo: true },
    });
    return roles;
}

export const getRol = async (id: string) => {
    const rol = await Rol.findByPk(id);
    if (rol) {
        return rol;
    } else {
        return null;
    }
}

export const postRol = async (req: Request) => {
    const { body } = req;
    const rol = await Rol.create({
        nombre: body.nombre,
        descripcion: body.descripcion,
    })
    await rol.save();
}

export const putRol = async (req: Request) => {
    const { body } = req;
    const { id } = req.params;
    const rol = await Rol.findByPk(id);
    if (rol){
        await rol.update(body);
    }
}

export const deleteRol = async (id: string) => {
    const rol = await Rol.findByPk(id);
    if (rol) {
        await rol.update({ activo: false });
    } 
}

export const restoreRol = async (id: string) => {
    const rol = await Rol.findByPk(id);
    if (rol) {
        await rol.update({ activo: true });
    } 
}

export const searchRol = async (nombre: string) => {
    const rol = await Rol.findOne({
        where: { nombre: nombre },
    });
    if (rol) {
        return true;
    } else {
        return false;
    }
}

export const getNombre = async (id: string) => {
    const rol = await Rol.findByPk(id);
    if (rol) {
        return rol.dataValues.nombre;
    }
}