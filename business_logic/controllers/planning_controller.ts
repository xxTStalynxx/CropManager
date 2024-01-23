import { Request, Response } from "express";
import { getNombre } from "../../data_access/roles_dta";
import { getDate } from "../processes/date_controller";
import { getUsuario } from "../../data_access/usuarios_dta";
import { changeEstado, getAllCamposParaActividades, getCampo, getCampos, getCamposParaActividades } from "../../data_access/campos_dta";
import { getActividadEstado, getActividades } from "../../data_access/estados_dta";
import { getConfig } from "../../data_access/configuracion_dta";
import { deletePlanificacion, finishPlanificacion, getActividad, getActividadActual, getPlanificacion, postPlanificacion, putPlanificacion, searchPlanificacion } from "../../data_access/planificacion_dta";
import { getSiembrasPorCampo } from "../../data_access/siembras_dta";
import { getNombreCultivo } from "../../data_access/cultivos_dta";

export const mostrarPlanificacion = async (req: Request, res: Response) => {
    let { campo } = req.params;
    let actividades: { id: number, actividad: string, fecha_inicio: string, fecha_fin: string, activo: number }[] = [];
    let actividad = {
        "id": 0,
        "actividad": '',
        "fecha_inicio": '',
        "fecha_fin": '',
        "activo": 0,
    };

    if (req.session.user) {
        if (campo == '0') {
            const _campos = await getCampos(req.session.user);
            if (_campos.length > 0){
                campo = _campos[0].dataValues.id;
            } else{
                campo = "0";
            }
        }
        const usuario = await getUsuario(req.session.user);
        const rol = await getNombre(usuario?.dataValues.rol_usuario);
        let campos;
        if (usuario?.dataValues.rol_usuario != 1) {
            campos = await getCamposParaActividades(req.session.user, campo);
        } else {
            campos = await getAllCamposParaActividades(campo);
        }
        const config = await getConfig();
        const estados = await getActividades(config[0].dataValues.campo_vacio, config[0].dataValues.campo_sembrado);
        const date = getDate();

        //Obtener actividades
        const siembras = await getSiembrasPorCampo(campo);
        const planificacion = await getPlanificacion(campo);

        if (siembras.length > 0) {
            for (let i = 0; i < siembras.length; i++) {
                const cultivo = await getNombreCultivo(siembras[i].dataValues.id_cultivo);
                siembras[i].dataValues.actividad = "Producción de " + cultivo;
            }
            let helper = 1;
            siembras.forEach(siembras => {
                actividad = { "id": 0, "actividad": '', "fecha_inicio": '', "fecha_fin": '', "activo": 0 };
                actividad['actividad'] = siembras.dataValues.actividad;
                actividad['fecha_inicio'] = siembras.dataValues.fecha_siembra;
                actividad['fecha_fin'] = siembras.dataValues.fecha_cosecha_est;
                actividad['activo'] = helper;
                actividades.push(actividad);
                helper = 0;
            });
        }

        if (planificacion.length > 0) {
            for (let i = 0; i < planificacion.length; i++) {
                const actividad = await getActividadEstado(planificacion[i].dataValues.actividad);
                planificacion[i].dataValues.nomActividad = actividad;
            }

            planificacion.forEach(planificacion => {
                actividad = { "id": 0, "actividad": '', "fecha_inicio": '', "fecha_fin": '', "activo": 0 };
                actividad['id'] = planificacion.dataValues.id;
                actividad['actividad'] = planificacion.dataValues.nomActividad;
                actividad['fecha_inicio'] = planificacion.dataValues.fecha_inicio;
                actividad['fecha_fin'] = planificacion.dataValues.fecha_fin;
                actividad['activo'] = planificacion.dataValues.activo;
                actividades.push(actividad);
            });
        }

        const _campo = await getCampo(campo);
        res.render('planning', { campos, _campo, estados, actividades, date, usuario, rol, activo: false, error: '' });
    } else {
        res.render('login', { error: '' });
    }
}

export const guardarActividad = async (req: Request, res: Response) => {
    const { body } = req;
    let actividades: { id: number, actividad: string, fecha_inicio: string, fecha_fin: string }[] = [];
    let actividad = {
        "id": 0,
        "actividad": '',
        "fecha_inicio": '',
        "fecha_fin": ''
    };

    const usuario = await getUsuario(req.session.user);
    const rol = await getNombre(usuario?.dataValues.rol_usuario);
    const campos = await getCamposParaActividades(req.session.user, body.id_campo);
    const config = await getConfig();
    const estados = await getActividades(config[0].dataValues.campo_vacio, config[0].dataValues.campo_sembrado);
    const date = getDate();

    //Obtener actividades
    const siembras = await getSiembrasPorCampo(body.id_campo);
    const planificacion = await getPlanificacion(body.id_campo);

    if (siembras.length > 0) {
        for (let i = 0; i < siembras.length; i++) {
            const cultivo = await getNombreCultivo(siembras[i].dataValues.id_cultivo);
            siembras[i].dataValues.actividad = "Producción de " + cultivo;
        }

        siembras.forEach(siembras => {
            actividad = { "id": 0, "actividad": '', "fecha_inicio": '', "fecha_fin": '' };
            actividad['actividad'] = siembras.dataValues.actividad;
            actividad['fecha_inicio'] = siembras.dataValues.fecha_siembra;
            actividad['fecha_fin'] = siembras.dataValues.fecha_cosecha_est;
            actividades.push(actividad);
        });
    }

    if (planificacion.length > 0) {
        for (let i = 0; i < planificacion.length; i++) {
            const actividad = await getActividadEstado(planificacion[i].dataValues.actividad);
            planificacion[i].dataValues.nomActividad = actividad;
        }

        planificacion.forEach(planificacion => {
            actividad = { "id": 0, "actividad": '', "fecha_inicio": '', "fecha_fin": '' };
            actividad['id'] = planificacion.dataValues.id;
            actividad['actividad'] = planificacion.dataValues.nomActividad;
            actividad['fecha_inicio'] = planificacion.dataValues.fecha_inicio;
            actividad['fecha_fin'] = planificacion.dataValues.fecha_fin;
            actividades.push(actividad);
        });
    }

    const _campo = await getCampo(body.id_campo);
    if (body.fecha_fin > body.fecha_inicio) {
        if (await searchPlanificacion(req)) {
            res.render('planning', { campos, _campo, actividades, estados, date, usuario, rol, activo: true, error: '* Ya tiene una actividad planificada para este periodo' });
        } else {
            if (siembras.length > 0) {
                let flag = 0;
                for (let i = 0; i < siembras.length; i++) {
                    if (body.fecha_inicio < siembras[i].dataValues.fecha_siembra && date >= body.fecha_inicio) {
                        await changeEstado(body.id_campo, body.actividad);
                        flag = 1;
                    }
                }
                await postPlanificacion(req, flag);
            } else {
                if (date >= body.fecha_inicio) {
                    await changeEstado(body.id_campo, body.actividad);
                    await postPlanificacion(req, 1);
                } else {
                    await postPlanificacion(req, 0);
                }
            }
            res.redirect('/actividades/'+ body.id_campo);
        }
    } else {
        res.render('planning', { campos, _campo, actividades, estados, date, usuario, rol, activo: true, error: '* La fecha de finalización debe ser mayor que la fecha de inicio' });
    }
}

export const buscarActividad = async (req: Request, res: Response) => {
    if (req.session.user){
        const { id } = req.params;
        const actividad = await getActividad(id);
        const date = getDate();
        const usuario = await getUsuario(req.session.user);
        const rol = await getNombre(usuario?.dataValues.rol_usuario);
        const nombre = await getActividadEstado(actividad?.dataValues.actividad);
        if (actividad !== null) {
            res.render('planning_edit', { actividad, nombre, date, usuario, rol, error:'' });
        } else {
            res.status(404).json({ message: 'No existe el rol' });
        }
    } else {
        res.render('login', { error: '' });
    }
}

export const editarActividad = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;
    const actividad = await getActividad(id);
    if (actividad !== null) {
        const usuario = await getUsuario(req.session.user);
        const rol = await getNombre(usuario?.dataValues.rol_usuario);
        const date = getDate();
        const nombre = await getActividadEstado(actividad?.dataValues.actividad);
    
        if (body.fecha_fin > body.fecha_inicio) {
            if (await searchPlanificacion(req)) {
                res.render('planning_edit', { actividad, nombre, date, usuario, rol, activo: true, error: '* Esta actividad ya está planificada en este periodo' });
            } else {
                await putPlanificacion(req);
                res.redirect('/actividades/'+ body.id_campo);
            }
        } else {
            res.render('planning_edit', { actividad, nombre, date, usuario, rol, activo: true, error: '* La fecha de finalización debe ser mayor que la fecha de inicio' });
        }
    } else {
        res.status(404).json({ message: 'No existe la actividad' });
    }
}

export const finalizarActividad = async (req: Request, res: Response) => {
    const { id } = req.params;
    const actividad = await getActividad(id);
    if (actividad !== null) {
        const siembras = await getSiembrasPorCampo(actividad.dataValues.id_campo);
        if (siembras.length <= 0) {
            const config = await getConfig();
            await changeEstado(actividad.dataValues.id_campo, config[0].dataValues.campo_vacio);
        }
        await finishPlanificacion(id);
        res.redirect('/actividades/' + actividad.dataValues.id_campo);
    } else {
        res.status(404).json({ message: 'No existe la actividad' });
    }
}

export const eliminarActividad = async (req: Request, res: Response) => {
    const { id } = req.params;
    const actividad = await getActividad(id);
    if (actividad !== null) {
        await deletePlanificacion(id);
        res.redirect('/actividades/' + actividad.dataValues.id_campo);
    } else {
        res.status(404).json({ message: 'No existe la actividad' });
    }
}

export const cancelarEditarActividad = (req: Request, res: Response) => {
    const { campo } = req.params;
    res.redirect('/actividades/' + campo);
};

export const showActividadActual = async (req: Request, res: Response) => {
    const { id_campo } = req.params;
    const actividad = await getActividadActual(id_campo);
    const nombre = await getActividadEstado(actividad?.dataValues.actividad);
    const data = {
        actividad: nombre,
        fecha_inicio: actividad?.dataValues.fecha_inicio,
        fecha_fin: actividad?.dataValues.fecha_fin
    }
    res.json(data);
}