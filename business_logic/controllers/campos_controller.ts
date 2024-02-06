import { Request, Response } from "express";
import { deleteCampo, getAllCampos, getCampo, getCampos, getCamposActivos, postCampo, putCampo } from "../../data_access/campos_dta";
import { getDate } from "../processes/date_controller";
import { getNombreUsuario, getUsuario, getUsuariosActivos } from "../../data_access/usuarios_dta";
import { getNombre } from "../../data_access/roles_dta";
import { getCultivosActivos } from "../../data_access/cultivos_dta";
import { getEstado, getEstadosActivos, getEstadosForCampos, getNombreEstado } from "../../data_access/estados_dta";
import { getConfig } from "../../data_access/configuracion_dta";

export const mostrarCampos = async (req: Request, res: Response) => {
    if (req.session.user) {
        let campos;
        const usuario = await getUsuario(req.session.user);
        if (usuario?.dataValues.rol_usuario != 1) {
            campos = await getCampos(req.session.user);
        } else {
            campos = await getCamposActivos();
        }
        const config = await getConfig();
        for (let i = 0; i < campos.length; i++) {
            const estado = await getEstado(campos[i].dataValues.estado);
            campos[i].dataValues.color = estado?.dataValues.color;
            campos[i].dataValues.nombreEstado = estado?.dataValues.nombre;
            campos[i].dataValues.campoSembrado = config[0].dataValues.campo_sembrado;
        }
        res.json(campos);
    } else {
        res.render('login', { error: '' });
    }
}

export const listarCampos = async (req: Request, res: Response) => {
    if (req.session.user) {
        const usuario = await getUsuario(req.session.user);
        const rol = await getNombre(usuario?.dataValues.rol_usuario);
        const config = await getConfig();
        let campos;
        let encargado;
        if (usuario?.dataValues.rol_usuario != 1) {
            campos = await getCampos(req.session.user);
        } else {
            campos = await getCamposActivos();
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
        res.render('fields', { campos, date, usuario, rol, config });
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

export const mostrarCampo = async (req: Request, res: Response) => {
    const { id_campo } = req.params;
    const campo = await getCampo(id_campo);
    if (campo !== null) {
        res.json(campo);
    } else {
        res.status(404).json({ message: 'No existe el campo' });
    }
}

export const agregarCampo = async (req: Request, res: Response) => {
    const { body } = req;
    const conf = await getConfig();
    if (body.area >= conf[0].dataValues.area_minima) {
        await postCampo(req);
        res.status(200).json({ message: 'Campo agregado correctamente' });
    } else {
        res.status(400).json({ error: 'El área del campo es muy pequeña' });
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

export const editarFormaCampo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const campo = await getCampo(id);
    if (campo !== null) {
        await putCampo(req);
        res.status(200).json({ message: 'Forma editada correctamente' });
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
    if (req.session.user) {
        let campos;
        const date = getDate();
        const cultivos = await getCultivosActivos();
        const usuario = await getUsuario(req.session.user);
        const rol = await getNombre(usuario?.dataValues.rol_usuario);
        if (usuario?.dataValues.rol_usuario != 1) {
            campos = await getCampos(req.session.user);
        } else {
            campos = await getCamposActivos();
        }
        const estados = await getEstadosActivos();
        const config = await getConfig();
        const usuarios = await getUsuariosActivos();
        res.render('traced', { date, usuario, rol, cultivos, campos, estados, usuarios, config });
    } else {
        res.render('login', { error: '' });
    }
}

export const cancelarEditarCampo = (req: Request, res: Response) => {
    res.redirect('/campos/list');
};