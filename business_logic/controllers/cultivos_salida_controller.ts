import { Request, Response } from "express";
import { deleteCampo, getCampo, getCampos, postCampo, putCampo } from "../../data_access/campos_dta";
import { getArea } from "../validations/parameters";
import { getCultivo_salida, getCultivo_salidas, postCultivo_salida } from "../../data_access/cultivos_salida_dta";
import { postCultivo } from "../../data_access/cultivos_dta";

export const listarCultivo_salidas = async (req: Request, res: Response) => {
    const cultivo_salidas = await getCultivo_salidas();
    res.json(cultivo_salidas);
}

export const buscarCultivo_salida = async (req: Request, res: Response) => {
    const { id } = req.params;
    const cultivo_salida = await getCultivo_salida(id);
    if (cultivo_salida !== null) {
        res.json(cultivo_salida);
    } else {
        res.status(404).json({ message: 'No existe el registro de cultivos de la salida' });
    }
}

export const agregarCultivo_salida = async (req: Request, res: Response) => {
    const { body } = req;
    if (body.cantidad > 0){
        await postCultivo_salida(req);
        res.status(200).json({ message: 'Registro de cultivos a la salida realizado correctamente' });
    } else {
        res.status(404).json({ message: 'La cantidad debe ser positiva' });
    }
}