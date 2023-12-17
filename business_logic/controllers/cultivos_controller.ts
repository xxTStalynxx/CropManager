import { Request, Response } from "express";
import { deleteCultivo, getCultivo, getCultivos, postCultivo, putCultivo, restoreCultivo, searchCultivo } from "../../data_access/cultivos_dta";
import { getDate } from "../processes/date_controller";
import { getUsuario } from "../../data_access/usuarios_dta";
import { getNombre } from "../../data_access/roles_dta";
import { getFamiliasActivas } from "../../data_access/familias.dta";

export const listarCultivos = async (req: Request, res: Response) => {
    if (req.session.user){
        const usuario = await getUsuario(req.session.user);
        if (usuario?.dataValues.rol_usuario != 1){
            res.render('noauth');
        } else {
            const rol = await getNombre(usuario?.dataValues.rol_usuario);
            const cultivos = await getCultivos();
            const familias = await getFamiliasActivas();
            const date = getDate();
            res.render('crops', { cultivos, familias, date, usuario, rol, error:'' });
        }
    } else {
        res.render('login', { error: '' });
    }
}

export const buscarCultivo = async (req: Request, res: Response) => {
    if (req.session.user){
        const { id } = req.params;
        const cultivo = await getCultivo(id);
        const usuario = await getUsuario(req.session.user);
        const rol = await getNombre(usuario?.dataValues.rol_usuario);
        const date = getDate();
        if (cultivo !== null) {
            const familias = await getFamiliasActivas();
            res.render('crops_edit', { cultivo, familias, date, usuario, rol, error:'' });
        } else {
            res.status(404).json({ message: 'No existe el cultivo' });
        }
    } else {
        res.render('login', { error: '' });
    }
}

export const agregarCultivo = async (req: Request, res: Response) => {
    const { body } = req;
    if (await searchCultivo(body.nombre)) {
        const usuario = await getUsuario(req.session.user);
        const rol = await getNombre(usuario?.dataValues.rol_usuario);
        const cultivos = await getCultivos();
        const familias = await getFamiliasActivas();
        const date = getDate();
        res.render('crops', { cultivos, familias, date, usuario, rol, error:'* El cultivo ya existe' });
    }
    else {
        await postCultivo(req);
        res.redirect('/cultivos');
    }
}

export const editarCultivo = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;
    const cultivo = await getCultivo(id);
    if (cultivo !== null) {
        if (body.nombre != cultivo.dataValues.nombre) {
            if (await searchCultivo(body.nombre)){
                const usuario = await getUsuario(req.session.user);
                const familias = await getFamiliasActivas();
                const rol = await getNombre(usuario?.dataValues.rol_usuario);
                const date = getDate();
                res.render('crops_edit', { cultivo, familias, date, usuario, rol, error: '* Cultivo ya registrado' });
            } else {
                await putCultivo(req);
                res.redirect('/cultivos');
            }
        } else {
            await putCultivo(req);
            res.redirect('/cultivos');
        }
    } else {
        res.status(404).json({ message: 'No existe el cultivo' });
    }
}

export const eliminarCultivo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const cultivo = await getCultivo(id);
    if (cultivo !== null) {
        await deleteCultivo(id);
        res.redirect('/cultivos');
    } else {
        res.status(404).json({ message: 'No existe el cultivo' });
    }
}

export const cancelarEditarCultivo = (req: Request, res: Response) => {
    res.redirect('/cultivos');
};

export const restaurarCultivo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const cultivo = await getCultivo(id);
    if (cultivo !== null) {
        await restoreCultivo(id);
        res.redirect('/cultivos');
    } else {
        res.status(404).json({ message: 'No existe el cultivo' });
    }
}