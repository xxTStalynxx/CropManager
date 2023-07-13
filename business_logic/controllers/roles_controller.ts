import { Request, Response } from "express";
import { deleteRol, getNombre, getRol, getRoles, postRol, putRol, restoreRol, searchRol } from "../../data_access/roles_dta";
import { getDate } from "../processes/date_controller";
import { getUsuario } from "../../data_access/usuarios_dta";

export const listarRoles = async (req: Request, res: Response) => {
    if (req.session.user){
        const usuario = await getUsuario(req.session.user);
        if (usuario?.dataValues.rol_usuario != 1){
            res.render('noauth');
        } else {
            const rol = await getNombre(usuario?.dataValues.rol_usuario);
            const roles = await getRoles();
            const date = getDate();
            res.render('roles', { roles, date, usuario, rol, error:'' });
        }
    } else {
        res.render('login', { error: '' });
    }
}

export const buscarRol = async (req: Request, res: Response) => {
    if (req.session.user){
        const { id } = req.params;
        const rol = await getRol(id);
        const date = getDate();
        const usuario = await getUsuario(req.session.user);
        const rolusuario = await getNombre(usuario?.dataValues.rol_usuario);
        if (rol !== null) {
            res.render('roles_edit', { rol, date, usuario, rolusuario, error:'' });
        } else {
            res.status(404).json({ message: 'No existe el rol' });
        }
    } else {
        res.render('login', { error: '' });
    }
}

export const agregarRol = async (req: Request, res: Response) => {
    const { body } = req;
    if (await searchRol(body.nombre)) {
        const usuario = await getUsuario(req.session.user);
        const rol = await getNombre(usuario?.dataValues.rol_usuario);
        const roles = await getRoles();
        const date = getDate();
        res.render('roles', { roles, date, usuario, rol, error:'* El rol ya existe' });
    }
    else {
        await postRol(req);
        res.redirect('/roles');
    }
}

export const editarRol = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;
    const rol = await getRol(id);
    if (rol !== null) {
        if (body.nombre != rol.dataValues.nombre) {
            if (await searchRol(body.nombre)){
                const date = getDate();
                const usuario = await getUsuario(req.session.user);
                const rolusuario = await getNombre(usuario?.dataValues.rol_usuario);
                res.render('roles_edit', { rol, date, usuario, rolusuario, error: '* Rol ya registrado' });
            } else {
                await putRol(req);
                res.redirect('/roles');
            }
        } else {
            await putRol(req);
            res.redirect('/roles');
        }
    } else {
        res.status(404).json({ message: 'No existe el rol' });
    }
}

export const eliminarRol = async (req: Request, res: Response) => {
    const { id } = req.params;
    const rol = await getRol(id);
    if (rol !== null) {
        await deleteRol(id);
        res.redirect('/roles');
    } else {
        res.status(404).json({ message: 'No existe el rol' });
    }
}

export const restaurarRol = async (req: Request, res: Response) => {
    const { id } = req.params;
    const rol = await getRol(id);
    if (rol !== null) {
        await restoreRol(id);
        res.redirect('/roles');
    } else {
        res.status(404).json({ message: 'No existe el rol' });
    }
}

export const cancelarEditarRol = (req: Request, res: Response) => {
    res.redirect('/roles');
};