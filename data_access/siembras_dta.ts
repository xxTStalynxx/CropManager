import Siembra from "../models/siembra";

export const getSiembras = async () => {
    const siembras = await Siembra.findAll();
    return siembras;
}

export const getSiembrasbyUsuario = async (id_camp: string) => {
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
        where:{ id_campo: id }
    })
    if (siembra) {
        return siembra;
    } else {
        return null;
    }
}

export const getSiembrasPorCampo = async (id: string) => {
    const siembras = await Siembra.findAll({
        where:{ id_campo: id },
        order:['fecha_cosecha_est']
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