import { Request, Response } from "express";
import { deleteCampo, getAllCampos, getCampo, getCampos, postCampo, putCampo } from "../../data_access/campos_dta";
import { getDate } from "../processes/date_controller";
import { getNombreUsuario, getUsuario } from "../../data_access/usuarios_dta";
import { getNombre } from "../../data_access/roles_dta";
import { getCultivosforCampos } from "../../data_access/cultivos_dta";
import { getEstadosForCampos, getNombreEstado } from "../../data_access/estados_dta";
import { getConfig } from "../../data_access/configuracion_dta";

export const mostrarCampos = async (req: Request, res: Response) => {
    const campos = await getCampos(req.session.user);
    res.json(campos);
}

export const listarCampos = async (req: Request, res: Response) => {
    if (req.session.user){
        const usuario = await getUsuario(req.session.user);
        const rol = await getNombre(usuario?.dataValues.rol_usuario);
        let campos;
        let encargado;
        if (usuario?.dataValues.rol_usuario != 1){
            campos = await getCampos(req.session.user);
        } else {
            campos = await getAllCampos();
            for (let i = 0; i < campos.length; i++) {
                encargado = await getNombreUsuario(campos[i].dataValues.encargado);
                campos[i].dataValues.nomEncargado = encargado;
            }
        }
        const date = getDate();
        let estado;
            for (let i = 0; i < campos.length; i++) {
                estado = await getNombreEstado(campos[i].dataValues.estado);
                campos[i].dataValues.nomEstado = estado;
            }
        res.render('fields', { campos, date, usuario, rol });
    } else {
        res.render('login', { error: '' });
    }
}

export const buscarCampo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const campo = await getCampo(id);
    if (campo !== null) {
        const date = getDate();
        const estados = await getEstadosForCampos();
        const usuario = await getUsuario(req.session.user);
        const rol = await getNombre(usuario?.dataValues.rol_usuario);
        res.render('fields_edit', { campo, date, usuario, rol, estados, error: '' });
    } else {
        res.status(404).json({ message: 'No existe el campo' });
    }
}

export const agregarCampo = async (req: Request, res: Response) => {
    const { body } = req;
    const conf = await getConfig();
    if (body.area >= conf[0].dataValues.area_minima){
        await postCampo(req);
        res.status(200).json({ message: 'Campo agregado correctamente' });
    } else {
        res.status(400).json({ error: 'El área del campo no cumple con los requisitos' });
    }
}

export const editarCampo = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;
    const campo = await getCampo(id);
    const conf = await getConfig();
    if (campo !== null) {
        if (body.area >= conf[0].dataValues.area_minima) {
            await putCampo(req);
            res.redirect('/campos/list');
        } else {
            const estados = await getEstadosForCampos();
            const usuario = await getUsuario(req.session.user);
            const rol = await getNombre(usuario?.dataValues.rol_usuario);
            const date = getDate();
            res.render('fields_edit', { campo, date, usuario, rol, estados, error: '* El área del campo es muy pequeña' });
        }
    } else {
        res.status(404).json({ message: 'No existe el campo' });
    }
}

export const eliminarCampo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const campo = await getCampo(id);
    if (campo !== null) {
        await deleteCampo(id);
        res.redirect('/campos/list');
    } else {
        res.status(404).json({ message: 'No existe el campo' });
    }
}

export const mostrarTrazado = async (req: Request, res: Response) => {
    if (req.session.user){
        const date = getDate();
        const cultivos = await getCultivosforCampos();
        const usuario = await getUsuario(req.session.user);
        const rol = await getNombre(usuario?.dataValues.rol_usuario);
        res.render('traced', { date, usuario, rol, cultivos });
    } else {
        res.render('login', { error: '' });
    }
}

export const cancelarEditarCampo = (req: Request, res: Response) => {
    res.redirect('/campos/list');
};