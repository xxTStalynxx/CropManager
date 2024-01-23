import { Request, Response } from "express";
import { deleteSiembra, getCamposDeSiembras, getProduccionPorCultivo, getSiembra, getSiembraByCampo, getSiembras, postSiembra, searchSiembra } from "../../data_access/siembras_dta";
import { changeEstado, getAreaCampo, getAreaTotal, getCampo } from "../../data_access/campos_dta";
import { getCultivo, getCultivosActivos, getNombreCultivo } from "../../data_access/cultivos_dta";
import { fechaEstimada, getDate } from "../processes/date_controller";
import { getConfig } from "../../data_access/configuracion_dta";
import { getUsuario } from "../../data_access/usuarios_dta";
import { getNombre } from "../../data_access/roles_dta";

export const listarSiembras = async (req: Request, res: Response) => {
    const siembras = await getSiembras();
    res.json(siembras);
}

export const buscarSiembra = async (req: Request, res: Response) => {
    const { id } = req.params;
    const siembra = await getSiembraByCampo(id);
    const cultivo = await getCultivo(siembra?.dataValues.id_cultivo);
    if (siembra !== null) {
        const data = {
            id: siembra?.dataValues.id,
            cultivo: cultivo?.dataValues.nombre,
            fecha_siembra: siembra?.dataValues.fecha_siembra,
            produccion_estimada: siembra?.dataValues.produccion_estimada,
            fecha_cosecha_est: siembra?.dataValues.fecha_cosecha_est
        }
        res.json(data);
    } else {
        res.status(404).json({ message: 'No existe la siembra' });
    }
}

export const agregarSiembra = async (req: Request, res: Response) => {
    const { body } = req;
    if (await searchSiembra(body.id_campo)) {
        res.status(404).json({ message: 'No se pueden agregar 2 siembras en el mismo campo' });
    }
    else {
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
        const conf = await getConfig();
        await changeEstado(body.id_campo, conf[0].dataValues.campo_sembrado);
        res.status(200).json({ message: 'Siembra agregada correctamente' });
    }
}

export const eliminarSiembra = async (req: Request, res: Response) => {
    const { id } = req.params;
    const siembra = await getSiembra(id);
    if (siembra !== null) {
        const conf = await getConfig();
        await changeEstado(siembra.dataValues.id_campo, conf[0].dataValues.campo_vacio);
        await deleteSiembra(id);
        res.redirect('/trazado');
    } else {
        res.status(404).json({ message: 'No existe la siembra' });
    }
}

async function produccionEstimada(id_cult: string, id_camp: string) {
    const cultivo = await getCultivo(id_cult);
    const campo = await getCampo(id_camp);
    return cultivo?.dataValues.productividad * campo?.dataValues.area;
}

export const showProduccionPorCultivo = async (req: Request, res: Response) => {
    if (req.session.user) {
        const usuario = await getUsuario(req.session.user);
        if (usuario?.dataValues.rol_usuario != 1) {
            res.render('noauth');
        } else {
            const rol = await getNombre(usuario?.dataValues.rol_usuario);
            const date = getDate();
            const year = new Date().getFullYear();
            let produccion: { cultivo: string, ene: number, feb: number, mar: number, abr: number, may: number, jun: number, jul: number, ago: number, sep: number, oct: number, nov: number, dic: number }[] = [];
            let item = {
                "cultivo": '',
                "ene": 0,
                "feb": 0,
                "mar": 0,
                "abr": 0,
                "may": 0,
                "jun": 0,
                "jul": 0,
                "ago": 0,
                "sep": 0,
                "oct": 0,
                "nov": 0,
                "dic": 0,
            };
            const cultivos = await getCultivosActivos();
            for (let i = 0; i < cultivos.length; i++) {
                let nomCultivo = await getNombreCultivo(cultivos[i].dataValues.id);
                item = { "cultivo": '', "ene": 0, "feb": 0, "mar": 0, "abr": 0, "may": 0, "jun": 0, "jul": 0, "ago": 0, "sep": 0, "oct": 0, "nov": 0, "dic": 0, };
                item['cultivo'] = nomCultivo;
                for (let mes = 1; mes <= 12; mes++) {
                    const siembras = await getProduccionPorCultivo(cultivos[i].dataValues.id, year, mes);
                    if (siembras.length > 0) {
                        switch (mes) {
                            case 1: item['ene'] = siembras[0].dataValues.total;
                                break;
                            case 2: item['feb'] = siembras[0].dataValues.total;
                                break;
                            case 3: item['mar'] = siembras[0].dataValues.total;
                                break;
                            case 4: item['abr'] = siembras[0].dataValues.total;
                                break;
                            case 5: item['may'] = siembras[0].dataValues.total;
                                break;
                            case 6: item['jun'] = siembras[0].dataValues.total;
                                break;
                            case 7: item['jul'] = siembras[0].dataValues.total;
                                break;
                            case 8: item['ago'] = siembras[0].dataValues.total;
                                break;
                            case 9: item['sep'] = siembras[0].dataValues.total;
                                break;
                            case 10: item['oct'] = siembras[0].dataValues.total;
                                break;
                            case 11: item['nov'] = siembras[0].dataValues.total;
                                break;
                            case 12: item['dic'] = siembras[0].dataValues.total;
                                break;
                        }
                    }
                }
                produccion.push(item);
            }
            res.render('reports/crops_production', { produccion, usuario, rol, date });
        }
    } else {
        res.render('login', { error: '' });
    }
}

export const showUsoCampos = async (req: Request, res: Response) => {
    if (req.session.user) {
        const usuario = await getUsuario(req.session.user);
        if (usuario?.dataValues.rol_usuario != 1) {
            res.render('noauth');
        } else {
            const rol = await getNombre(usuario?.dataValues.rol_usuario);
            const date = getDate();
            const areaTotal = await getAreaTotal();
            res.render('reports/fields_use', { usuario, rol, date, area: areaTotal[0].dataValues.total });
        }
    } else {
        res.render('login', { error: '' });
    }
}

export const dataUsoCampos = async (req: Request, res: Response) => {
    const areaTotal = await getAreaTotal();
    const date = getDate();
    let data: { cultivo: string, area: number }[] = [];
    let item = {
        "cultivo": '',
        "area": 0
    };
    let total = 0;
    const cultivos = await getCultivosActivos();
    for (let i = 0; i < cultivos.length; i++) {
        let nomCultivo = await getNombreCultivo(cultivos[i].dataValues.id);
        item = { "cultivo": '', "area": 0};
        item['cultivo'] = nomCultivo;
        const camposSembrados = await getCamposDeSiembras(cultivos[i].dataValues.id, date);
        if (camposSembrados.length > 0) {
            for (let j = 0; j < camposSembrados.length; j++) {
                const area = await getAreaCampo(camposSembrados[j].dataValues.id_campo);
                item['area'] += area;
                total += area;
            }
        } else {
            item['area'] += 0;
        }
        data.push(item);
    }
    item = { "cultivo": '', "area": 0};
    item['cultivo'] = 'Sin uso';
    item['area'] = areaTotal[0].dataValues.total - total;
    data.push(item);
    res.json(data);
}