import { Request, Response } from "express";
import { deleteFamilia, getFamilia, getFamilias, postFamilia, putFamilia, restoreFamilia, searchFamilia } from "../../data_access/familias.dta";
import { getDate } from "../processes/date_controller";
import { getUsuario } from "../../data_access/usuarios_dta";
import { getNombre } from "../../data_access/roles_dta";

export const listarFamilias = async (req: Request, res: Response) => {
    if (req.session.user){
        const usuario = await getUsuario(req.session.user);
        if (usuario?.dataValues.rol_usuario != 1){
            res.render('noauth');
        } else {
            const rol = await getNombre(usuario?.dataValues.rol_usuario);
            const familias = await getFamilias();
            const date = getDate();
            res.render('families', { familias, date, usuario, rol, error:'' });
        }
    } else {
        res.render('login', { error: '' });
    }
}

export const buscarFamilia = async (req: Request, res: Response) => {
    if (req.session.user){
        const { id } = req.params;
        const familia = await getFamilia(id);
        const date = getDate();
        const usuario = await getUsuario(req.session.user);
        const rol = await getNombre(usuario?.dataValues.rol_usuario);
        if (familia !== null) {
            res.render('families_edit', { familia, date, usuario, rol, error:'' });
        } else {
            res.status(404).json({ message: 'No existe la familia' });
        }
    } else {
        res.render('login', { error: '' });
    }
}

export const agregarFamilia = async (req: Request, res: Response) => {
    const { body } = req;
    if (await searchFamilia(body.nombre)) {
        const usuario = await getUsuario(req.session.user);
        const rol = await getNombre(usuario?.dataValues.rol_usuario);
        const familias = await getFamilias();
        const date = getDate();
        res.render('families', { familias, date, usuario, rol, error:'* La familia de cultivos ya existe' });
    }
    else {
        await postFamilia(req);
        res.redirect('/familias');
    }
}

export const editarFamilia = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;
    const familia = await getFamilia(id);
    if (familia !== null) {
        if (body.nombre != familia.dataValues.nombre) {
            if (await searchFamilia(body.nombre)){
                const date = getDate();
                const usuario = await getUsuario(req.session.user);
                const rol = await getNombre(usuario?.dataValues.rol_usuario);
                res.render('families_edit', { familia, date, usuario, rol, error: '* Familia de cultivo ya registrada' });
            } else {
                await putFamilia(req);
                res.redirect('/familias');
            }
        } else {
            await putFamilia(req);
            res.redirect('/familias');
        }
    } else {
        res.status(404).json({ message: 'No existe la familia' });
    }
}

export const eliminarFamilia = async (req: Request, res: Response) => {
    const { id } = req.params;
    const familia = await getFamilia(id);
    if (familia !== null) {
        await deleteFamilia(id);
        res.redirect('/familias');
    } else {
        res.status(404).json({ message: 'No existe la familia' });
    }
}

export const restaurarFamilia = async (req: Request, res: Response) => {
    const { id } = req.params;
    const familia = await getFamilia(id);
    if (familia !== null) {
        await restoreFamilia(id);
        res.redirect('/familias');
    } else {
        res.status(404).json({ message: 'No existe la familia' });
    }
}

export const cancelarEditarFamilia = (req: Request, res: Response) => {
    res.redirect('/familias');
};