import { Request } from "express";
import Usuario from "../models/usuario";
import { Op } from "sequelize";

export const getUsuarios = async () => {
    const usuarios = await Usuario.findAll();
    return usuarios;
}

export const getUsuario = async (id: string) => {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
        return usuario;
    } else {
        return null;
    }
}

export const getUsuariosActivos = async () => {
    const usuarios = await Usuario.findAll({
        where: { activo: true }
    });
    return usuarios;
}

export const postUsuario = async (body: any) => {
    const usuario = await Usuario.create({
        nombre: body.nombre,
        correo: body.correo,
        contrasena: body.contrasena,
    });
    await usuario.save();
}

export const putUsuario = async (req: Request) => {
    const { body } = req;
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
        await usuario.update(body);
    }
}

export const putNombreUsuario = async (req: Request) => {
    const { body } = req;
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
        await usuario.update({
            nombre: body.nombre,
        });
    }
}

export const deleteUsuario = async (id: string) => {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
        await usuario.update({ activo: false });
    }
}

export const restoreUsuario = async (id: string) => {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
        await usuario.update({ activo: true });
    }
}

export const searchByEmail = async (correo: string) => {
    const usuario = await Usuario.findOne({
        where: {
            [Op.and]: [
                { correo: correo },
                { activo: true }
            ]
        }
    });
    if (usuario) {
        return usuario;
    } else {
        return null;
    }
}

export const getNombreUsuario = async (id: string) => {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
        return usuario.dataValues.nombre;
    }
}

export const changeRol = async (req: Request) => {
    const { id, rol } = req.params;
    const nuevoRU = {
        rol_usuario: rol,
    }
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
        await usuario.update(nuevoRU);
    }
}

export const countUsuarios = async () => {
    const nu = Usuario.count();
    return nu;
}