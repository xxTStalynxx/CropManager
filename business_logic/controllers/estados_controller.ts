import { Request, Response } from "express";
import { deleteEstado, getEstado, getEstados, postEstado, putEstado, restoreEstado, searchEstado } from "../../data_access/estados_dta";
import { getDate } from "../processes/date_controller";
import { getUsuario } from "../../data_access/usuarios_dta";
import { getNombre } from "../../data_access/roles_dta";

export const listarEstados = async (req: Request, res: Response) => {
    if (req.session.user){
        const usuario = await getUsuario(req.session.user);
        if (usuario?.dataValues.rol_usuario != 1){
            res.render('noauth');
        } else {
            const rol = await getNombre(usuario?.dataValues.rol_usuario);
            const estados = await getEstados();
            const date = getDate();
            res.render('states', { estados, date, usuario, rol, error:'' });
        }
    } else {
        res.render('login', { error: '' });
    }
}

export const buscarEstado = async (req: Request, res: Response) => {
    if (req.session.user){
        const { id } = req.params;
        const estado = await getEstado(id);
        const date = getDate();
        const usuario = await getUsuario(req.session.user);
        const rol = await getNombre(usuario?.dataValues.rol_usuario);
        if (estado !== null) {
            res.render('states_edit', { estado, date, usuario, rol, error:'' });
        } else {
            res.status(404).json({ message: 'No existe el estado' });
        }
    } else {
        res.render('login', { error: '' });
    }
}

export const agregarEstado = async (req: Request, res: Response) => {
    const { body } = req;
    if (await searchEstado(body.nombre)) {
        const usuario = await getUsuario(req.session.user);
        const rol = await getNombre(usuario?.dataValues.rol_usuario);
        const estados = await getEstados();
        const date = getDate();
        res.render('states', { estados, date, usuario, rol, error:'* El estado ya existe' });
    }
    else {
        await postEstado(req);
        res.redirect('/estados');
    }
}

export const editarEstado = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;
    const estado = await getEstado(id);
    if (estado !== null) {
        if (body.nombre != estado.dataValues.nombre) {
            if (await searchEstado(body.nombre)){
                const date = getDate();
                const usuario = await getUsuario(req.session.user);
                const rol = await getNombre(usuario?.dataValues.rol_usuario);
                res.render('states_edit', { estado, date, usuario, rol, error: '* Estado ya registrado' });
            } else {
                await putEstado(req);
                res.redirect('/estados');
            }
        } else {
            await putEstado(req);
            res.redirect('/estados');
        }
    } else {
        res.status(404).json({ message: 'No existe el estado' });
    }
}

export const eliminarEstado = async (req: Request, res: Response) => {
    const { id } = req.params;
    const estado = await getEstado(id);
    if (estado !== null) {
        await deleteEstado(id);
        res.redirect('/estados');
    } else {
        res.status(404).json({ message: 'No existe el estado' });
    }
}

export const restaurarEstado = async (req: Request, res: Response) => {
    const { id } = req.params;
    const estado = await getEstado(id);
    if (estado !== null) {
        await restoreEstado(id);
        res.redirect('/estados');
    } else {
        res.status(404).json({ message: 'No existe el estado' });
    }
}

export const cancelarEditarEstado = (req: Request, res: Response) => {
    res.redirect('/estados');
};