import { Request } from "express";
import Familia from "../models/familia";
import { Op } from "sequelize";

export const getFamilias = async () => {
    const familias = await Familia.findAll();
    return familias;
}

export const getFamiliasActivas = async () => {
    const familias = await Familia.findAll({
        where: { activo: true },
    });
    return familias;
}

export const getFamiliasPorExigencia = async (exigencia: number) => {
    const familias = await Familia.findAll({
        where: { exigencia_organica: exigencia },
    });
    return familias;
}

export const getFamiliasMenorExigencia = async (exigencia: number) => {
    const familias = await Familia.findAll({
        where: {
            exigencia_organica: { [Op.lte]: exigencia }
        }
    });
    return familias;
}

export const getFamilia = async (id: string) => {
    const familia = await Familia.findByPk(id);
    if (familia) {
        return familia;
    } else {
        return null;
    }
}

export const postFamilia = async (req: Request) => {
    const { body } = req;
    const familia = await Familia.create({
        nombre: body.nombre,
        exigencia_organica: body.exigencia_organica,
        descripcion: body.descripcion,
    })
    await familia.save();
}

export const putFamilia = async (req: Request) => {
    const { body } = req;
    const { id } = req.params;
    const familia = await Familia.findByPk(id);
    if (familia) {
        await familia.update(body);
    }
}

export const deleteFamilia = async (id: string) => {
    const familia = await Familia.findByPk(id);
    if (familia) {
        await familia.update({ activo: false });
    }
}

export const restoreFamilia = async (id: string) => {
    const familia = await Familia.findByPk(id);
    if (familia) {
        await familia.update({ activo: true });
    }
}

export const searchFamilia = async (nombre: string) => {
    const familia = await Familia.findOne({
        where: { nombre: nombre },
    });
    if (familia) {
        return true;
    } else {
        return false;
    }
}