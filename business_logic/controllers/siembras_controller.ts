import { Request, Response } from "express";
import { deleteSiembra, getSiembra, getSiembras, postSiembra, searchSiembra } from "../../data_access/siembras_dta";

export const listarSiembras = async (req: Request, res: Response) => {
    const siembras = await getSiembras();
    res.json(siembras);
}

export const buscarSiembra = async (req: Request, res: Response) => {
    const { id } = req.params;
    const siembra = await getSiembra(id);
    if (siembra !== null) {
        res.json(siembra);
    } else {
        res.status(404).json({ message: 'No existe la siembra' });
    }
}

export const agregarSiembra = async (req: Request, res: Response) => {
    const { body } = req;
    if (await searchSiembra(body.campo)) {
        res.status(404).json({ message: 'No se pueden agregar 2 siembras en el mismo campo' });
    }
    else {
        await postSiembra(req);
        res.status(200).json({ message: 'Siembra agregada correctamente' });
    }
}

export const eliminarSiembra = async (req: Request, res: Response) => {
    const { id } = req.params;
    const siembra = await getSiembra(id);
    if (siembra !== null) {
        await deleteSiembra(id);
        res.status(200).json({ message: 'Siembra eliminada correctamente' });
    } else {
        res.status(404).json({ message: 'No existe la siembra' });
    }
}