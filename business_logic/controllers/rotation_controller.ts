import { Request, Response } from "express";
import { fechaEstimada, getDate } from "../processes/date_controller";
import { getUsuario } from "../../data_access/usuarios_dta";
import { getNombre } from "../../data_access/roles_dta";
import { getCultivo, getCultivosActivos, getCultivosRecomendados } from "../../data_access/cultivos_dta";
import { getCampo, getCamposSembrados } from "../../data_access/campos_dta";
import { getConfig } from "../../data_access/configuracion_dta";
import { getEstado } from "../../data_access/estados_dta";
import { getFamilia, getFamiliasMenorExigencia, getFamiliasPorExigencia } from "../../data_access/familias.dta";
import { getSiembrasPorCampo, postSiembra } from "../../data_access/siembras_dta";

export const mostrarRotacion = async (req: Request, res: Response) => {
    if (req.session.user) {
        const date = getDate();
        const cultivos = await getCultivosActivos();
        const usuario = await getUsuario(req.session.user);
        const rol = await getNombre(usuario?.dataValues.rol_usuario);
        const estadoSembrado = await getConfig();
        const campos = await getCamposSembrados(req.session.user, estadoSembrado[0].dataValues.campo_sembrado);
        res.render('rotation', { date, usuario, rol, cultivos, campos, error: '' });
    } else {
        res.render('login', { error: '' });
    }
}

export const mostrarCamposSembrados = async (req: Request, res: Response) => {
    const estadoSembrado = await getConfig();
    let campos = await getCamposSembrados(req.session.user, estadoSembrado[0].dataValues.campo_sembrado);
    for (const element of campos) {
        const estado = await getEstado(element.dataValues.estado);
        element.dataValues.color = estado?.dataValues.color;
    }
    res.json(campos);
}

export const mostrarCultivosRecomendados = async (req: Request, res: Response) => {
    const { campo } = req.params;
    const siembras = await getSiembrasPorCampo(campo);
    const cultivo = await getCultivo(siembras[siembras.length - 1].dataValues.id_cultivo);
    console.log(cultivo);
    const familia = await getFamilia(cultivo?.dataValues.familia);
    let cultivos: any[] = [];
    if (familia?.dataValues.exigencia_organica != 1) {
        let exigencia = familia?.dataValues.exigencia_organica;
        do {
            const familias = await getFamiliasPorExigencia(exigencia - 1);
            for (let i = 0; i < familias.length; i++) {
                const _cultivos = await getCultivosRecomendados(cultivo?.dataValues.id, familias[i].dataValues.id);

                for (let j = 0; j < _cultivos.length; j++) {
                    _cultivos[j].dataValues.recomendado = 1;
                    cultivos = cultivos.concat(_cultivos[j]);
                }
            }
            exigencia--;
        } while (exigencia > 1 && cultivos.length < 1);

        if (cultivos.length < 1) {
            const _cultivos = await getCultivosActivos();
            for (let i = 0; i < cultivos.length; i++) {
                _cultivos[i].dataValues.recomendado = 2;
                cultivos = cultivos.concat(_cultivos[i]);
            }
        } else if (exigencia > 1) {
            const _familias = await getFamiliasMenorExigencia(exigencia - 1);
            for (let i = 0; i < _familias.length; i++) {
                const _cultivos = await getCultivosRecomendados(cultivo?.dataValues.id, _familias[i].dataValues.id);
                for (let j = 0; j < _cultivos.length; j++) {
                    _cultivos[j].dataValues.recomendado = 0;
                    cultivos = cultivos.concat(_cultivos[j]);
                }
            }
        }
    } else {
        const _cultivos = await getCultivosActivos();
        for (let i = 0; i < cultivos.length; i++) {
            _cultivos[i].dataValues.recomendado = 2;
            cultivos = cultivos.concat(_cultivos[i]);
        }
    }
    res.json(cultivos);
}

export const mostrarSiembra = async (req: Request, res: Response) => {
    const { campo } = req.params;
    const siembras = await getSiembrasPorCampo(campo);
    res.json(siembras);
}

export const agregarRotacionDeSiembra = async (req: Request, res: Response) => {
    const { body } = req;
    const prod_est = await produccionEstimada(body.id_cultivo, body.id_campo);
    const fecha_est = await fechaEstimada(body.fecha_siembra, body.id_cultivo);
    let newSimbra = {
        id_campo: body.id_campo,
        id_cultivo: body.id_cultivo,
        fecha_siembra: body.fecha_siembra,
        produccion_estimada: prod_est,
        fecha_cosecha_est: fecha_est
    }
    await postSiembra(newSimbra);
    res.redirect('/rotacion');
}

async function produccionEstimada(id_cult: string, id_camp: string) {
    const cultivo = await getCultivo(id_cult);
    const campo = await getCampo(id_camp);
    return cultivo?.dataValues.productividad * campo?.dataValues.area;
}