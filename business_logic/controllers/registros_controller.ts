import { Request, Response } from "express";
import { deleteRegistro, getAllRegistros, getRegistro, getRegistros, postRegistro } from "../../data_access/registros_dta";
import { getDate } from "../processes/date_controller";
import { getUsuario } from "../../data_access/usuarios_dta";
import { getNombre } from "../../data_access/roles_dta";
import { deleteSiembra, getSiembra } from "../../data_access/siembras_dta";
import { changeEstado, getCampos, getNombreCampo } from "../../data_access/campos_dta";
import { getNombreCultivo } from "../../data_access/cultivos_dta";
import { getConfig } from "../../data_access/configuracion_dta";

export const listarRegistros = async (req: Request, res: Response) => {
    if (req.session.user) {
        const usuario = await getUsuario(req.session.user);
        const rol = await getNombre(usuario?.dataValues.rol_usuario);
        let registros: any[]=[];
        if ( usuario?.dataValues.rol_usuario != 1 ){
            const campos = await getCampos(usuario?.dataValues.id);
            if (campos.length>0){
                for (let i=0; i<campos.length; i++){
                    const registro = await getRegistros(campos[i].dataValues.id);
                    registros = registros.concat(registro);
                }
            }
        } else {
            registros = await getAllRegistros();
        }
        const date = getDate();
        for (let i = 0; i < registros.length; i++) {
            registros[i].dataValues.nomCampo = await getNombreCampo(registros[i].dataValues.campo);
            registros[i].dataValues.nomCultivo = await getNombreCultivo(registros[i].dataValues.cultivo);
        }
        res.render('records', { registros, date, usuario, rol });
    } else {
        res.render('login', { error: '' });
    }
}

export const buscarRegistro = async (req: Request, res: Response) => {
    const { id } = req.params;
    const registro = await getRegistro(id);
    if (registro !== null) {
        res.json(registro);
    } else {
        res.status(404).json({ message: 'No existe el registro' });
    }
}

export const agregarRegistro = async (req: Request, res: Response) => {
    const { body } = req;
    const siembra = await getSiembra(body.id);
    let newRegistro = {
        campo: siembra?.dataValues.id_campo,
        cultivo: siembra?.dataValues.id_cultivo,
        cantidad: body.produccion,
        novedades: body.novedades,
        fecha_siembra: siembra?.dataValues.fecha_siembra,
        fecha_cosecha: body.fecha_cosecha
    }
    await postRegistro(newRegistro);
    const conf = await getConfig();
    await changeEstado(siembra?.dataValues.id_campo, conf[0].dataValues.campo_vacio);
    await deleteSiembra(body.id);
    res.redirect('/trazado');
}

export const eliminarRegistro = async (req: Request, res: Response) => {
    const { id } = req.params;
    const registro = await getRegistro(id);
    if (registro !== null) {
        await deleteRegistro(id);
        res.redirect('/registros');
    } else {
        res.status(404).json({ message: 'No existe el registro' });
    }
}