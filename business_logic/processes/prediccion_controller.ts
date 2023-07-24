import { Request, Response } from "express";
import { getCampo } from "../../data_access/campos_dta";
import { getCultivo } from "../../data_access/cultivos_dta";

export const doPrediccion = async (req: Request, res: Response) => {
    const { id_camp, id_cult } = req.params;
    const campo = await getCampo(id_camp);
    const cultivo = await getCultivo(id_cult);
    const prod_est = campo?.dataValues.area * cultivo?.dataValues.productividad;
    const data = {
        cultivo: cultivo?.dataValues.nombre,
        produccion_estimada: prod_est,
        ganancia_estimada: (prod_est * cultivo?.dataValues.precio).toFixed(2)
    }
    res.json(data);
}