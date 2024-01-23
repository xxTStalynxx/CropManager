import { Op, Sequelize } from "sequelize";
import Siembra from "../models/siembra";

export const getSiembras = async () => {
    const siembras = await Siembra.findAll();
    return siembras;
}

export const getSiembrasPorUsuario = async (id_camp: string) => {
    const siembras = await Siembra.findAll({
        where: { id_campo: id_camp }
    });
    return siembras;
}

export const getSiembra = async (id: string) => {
    const siembra = await Siembra.findByPk(id);
    if (siembra) {
        return siembra;
    } else {
        return null;
    }
}

export const getSiembraByCampo = async (id: string) => {
    const siembra = await Siembra.findOne({
        where: { id_campo: id }
    })
    if (siembra) {
        return siembra;
    } else {
        return null;
    }
}

export const getSiembrasPorCampo = async (id: string) => {
    const siembras = await Siembra.findAll({
        where: { id_campo: id },
        order: ['fecha_cosecha_est']
    });
    return siembras;
}

export const postSiembra = async (newSiembra: any) => {
    const siembra = await Siembra.create({
        id_campo: newSiembra.id_campo,
        id_cultivo: newSiembra.id_cultivo,
        fecha_siembra: newSiembra.fecha_siembra,
        produccion_estimada: newSiembra.produccion_estimada,
        fecha_cosecha_est: newSiembra.fecha_cosecha_est,
    });
    await siembra.save();
}

export const deleteSiembra = async (id: string) => {
    const siembra = await Siembra.findByPk(id);
    if (siembra) {
        await siembra.destroy();
    }
}

export const searchSiembra = async (campo: number) => {
    const siembra = await Siembra.findOne({
        where: { id_campo: campo },
    });
    if (siembra) {
        return true;
    } else {
        return false;
    }
}

export const getProduccionPorCultivo = async (id: string, year: number, month: number) => {
    const siembras = await Siembra.findAll({
        attributes: [
            'id_cultivo',
            [Sequelize.fn('SUM', Sequelize.col('produccion_estimada')), 'total']
        ],
        where: {
            id_cultivo: id,
            [Op.and]: Sequelize.literal(`MONTH(fecha_cosecha_est) = ${month}`),
            fecha_cosecha_est: {
                [Op.between]: [new Date(`${year}-01-01`), new Date(`${year}-12-31`)]
            }
        },
        group: ['id_cultivo']
    });
    return siembras;
}

export const getCamposDeSiembras = async (id: string, date: string) => {
    const siembras = await Siembra.findAll({
        attributes: [
            'id_campo',
        ],
        where: {
            id_cultivo: id,
            fecha_siembra: {
                [Op.lte]: date
            },
            fecha_cosecha_est: {
                [Op.gte]: date
            }
        },
        group: ['id_campo']
    });
    return siembras;
}