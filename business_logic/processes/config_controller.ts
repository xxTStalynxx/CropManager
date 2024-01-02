import { Request, Response } from "express";
import { getUsuario } from "../../data_access/usuarios_dta";
import { getNombre } from "../../data_access/roles_dta";
import { getDate } from "./date_controller";
import { getEstadosActivos } from "../../data_access/estados_dta";
import { getConfig, postConfig, putConfig } from "../../data_access/configuracion_dta";

export const mostrarConfig = async (req: Request, res: Response) => {
    if (req.session.user){
        const usuario = await getUsuario(req.session.user);
        if (usuario?.dataValues.rol_usuario != 1){
            res.render('noauth');
        } else {
            const rol = await getNombre(usuario?.dataValues.rol_usuario);
            const date = getDate();
            const estados = await getEstadosActivos();
            const config = await getConfig();
            res.render('configuracion', { config, estados, date, usuario, rol, error:'' });
        }
    } else {
        res.render('login', { error: '' });
    }
}

export const guardarConfig = async (req: Request, res: Response) => {
    if (req.session.user){
        const usuario = await getUsuario(req.session.user);
        if (usuario?.dataValues.rol_usuario != 1){
            res.render('noauth');
        } else {
            if (req.body.campo_vacio != req.body.campo_sembrado){
                await postConfig(req);
                res.redirect('/configuracion');
            } else {
                const rol = await getNombre(usuario?.dataValues.rol_usuario);
                const date = getDate();
                const estados = await getEstadosActivos();
                const config = await getConfig();
                res.render('configuracion', { config, estados, date, usuario, rol, error:'* Los estados deben ser diferentes' });
            }
        }
    } else {
        res.render('login', { error: '' });
    }
}

export const editarConfig = async (req: Request, res: Response) => {
    if (req.session.user){
        const usuario = await getUsuario(req.session.user);
        if (usuario?.dataValues.rol_usuario != 1){
            res.render('noauth');
        } else {
            if (req.body.campo_vacio != req.body.campo_sembrado){
                await putConfig(req);
                res.redirect('/configuracion');
            } else {
                const rol = await getNombre(usuario?.dataValues.rol_usuario);
                const date = getDate();
                const estados = await getEstadosActivos();
                const config = await getConfig();
                res.render('configuracion', { config, estados, date, usuario, rol, error:'* Los estados deben ser diferentes' });
            }
        }
    } else {
        res.render('login', { error: '' });
    }
}