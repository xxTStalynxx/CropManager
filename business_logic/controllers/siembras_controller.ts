import { Request, Response } from "express";
import { deleteSiembra, getSiembra, getSiembraByCampo, getSiembras, postSiembra, searchSiembra } from "../../data_access/siembras_dta";
import { changeEstado, getCampo } from "../../data_access/campos_dta";
import { getCultivo } from "../../data_access/cultivos_dta";
import { fechaEstimada } from "../processes/date_controller";
import { getConfig } from "../../data_access/configuracion_dta";

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

async function produccionEstimada(id_cult: string, id_camp: string){
    const cultivo = await getCultivo(id_cult);
    const campo = await getCampo(id_camp);
    return cultivo?.dataValues.productividad * campo?.dataValues.area;
}