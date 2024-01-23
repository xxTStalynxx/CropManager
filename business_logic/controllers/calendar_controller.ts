import { Request, Response } from "express";
import { getDate } from "../processes/date_controller";
import { getUsuario } from "../../data_access/usuarios_dta";
import { getNombre } from "../../data_access/roles_dta";
import { getSiembras, getSiembrasPorUsuario } from "../../data_access/siembras_dta";
import { getCampos, getNombreCampo } from "../../data_access/campos_dta";
import { getNombreCultivo } from "../../data_access/cultivos_dta";

export const showCalendar = async (req: Request, res: Response) => {
    if (req.session.user) {
        const date = getDate();
        const usuario = await getUsuario(req.session.user);
        const rol = await getNombre(usuario?.dataValues.rol_usuario);
        res.render('calendar', { usuario, date, rol });
    } else {
        res.render('login', { error: '' });
    }
}

export const dataCalendar = async (req: Request, res: Response) => {
    const usuario = await getUsuario(req.session.user);
    let actividades: any[] = [];
    if (usuario?.dataValues.rol_usuario != 1) {
        const campos = await getCampos(usuario?.dataValues.id);
        if (campos.length > 0) {
            for (let i = 0; i < campos.length; i++) {
                const actividad = await getSiembrasPorUsuario(campos[i].dataValues.id);
                actividades = actividades.concat(actividad);
            }
        }
    } else {
        actividades = await getSiembras();
    }

    let siembra = {
        "title": '',
        "start": ''
    };
    let cosecha = {
        "title": '',
        "start": ''
    };
    let data: { start: string, title: string }[] = [];
    if (actividades.length > 0) {
        for (let i = 0; i < actividades.length; i++) {
            const campo = await getNombreCampo(actividades[i].dataValues.id_campo);
            const cultivo = await getNombreCultivo(actividades[i].dataValues.id_cultivo);
            actividades[i].dataValues.nomCampo = campo;
            actividades[i].dataValues.nomCultivo = cultivo;
        }

        actividades.forEach(actividades => {
            siembra = {"title": '', "start": ''};
            siembra['title'] = actividades.dataValues.nomCampo + ": Siembra de " + actividades.dataValues.nomCultivo;
            siembra['start'] = actividades.dataValues.fecha_siembra;
            data.push(siembra);
            cosecha = {"title": '', "start": ''};
            cosecha['title'] = actividades.dataValues.nomCampo + ": Cosecha de " + actividades.dataValues.nomCultivo;
            cosecha['start'] = actividades.dataValues.fecha_cosecha_est;
            data.push(cosecha);
        });
    }
    res.json(data)
}