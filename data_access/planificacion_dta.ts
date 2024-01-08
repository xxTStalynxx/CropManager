import { Request } from "express";
import Planificacion from "../models/planificacion";
import { Op } from "sequelize";

export const getPlanificacion = async (id_campo: string) => {
    const planificacion = await Planificacion.findAll({
        where: { id_campo: id_campo },
    });
    return planificacion;
}

export const getActividad = async (id: string) => {
    const actividad = await Planificacion.findByPk(id);
    if (actividad) {
        return actividad;
    } else {
        return null;
    }
}

export const getActividadActual = async (campo: string) => {
    const actividad = await Planificacion.findOne({
        where: {
            id_campo: campo,
            activo: 1
        }
    });
    if (actividad) {
        return actividad;
    } else {
        return null;
    }
}

export const postPlanificacion = async (req: Request, _activo: number) => {
    const { body } = req;
    const planificacion = await Planificacion.create({
        id_campo: body.id_campo,
        actividad: body.actividad,
        fecha_inicio: body.fecha_inicio,
        fecha_fin: body.fecha_fin,
        activo: _activo,
    })
    await planificacion.save();
}

export const putPlanificacion = async (req: Request) => {
    const { body } = req;
    const { id } = req.params;
    const planificacion = await Planificacion.findByPk(id);
    if (planificacion){
        await planificacion.update(body);
    }
}

export const finishPlanificacion = async (id: string) => {
    const planificacion = await Planificacion.findByPk(id);
    if (planificacion) {
        await planificacion.update({ activo: 2 });
    }  
}

export const deletePlanificacion = async (id: string) => {
    const planificacion = await Planificacion.findByPk(id);
    if (planificacion) {
        await planificacion.destroy();
    } 
}

export const searchPlanificacion = async (req: Request) => {
    const { body } = req;
    const planificacion = await Planificacion.findAll({
        where: { fecha_inicio: { [Op.between]: [ body.fecha_inicio, body.fecha_fin ] },
            id_campo: body.id_campo,
        }
    });
    if (planificacion.length > 0){
        return true;
    } else {
        return false;
    }
}