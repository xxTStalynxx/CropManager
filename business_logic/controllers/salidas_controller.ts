import { Request, Response } from "express";
import { deleteSalida, getSalida, getSalidas, postSalida } from "../../data_access/salidas_dta";

export const listarSalidas = async (req: Request, res: Response) => {
    const salidas = await getSalidas();
    res.render('departures', { salidas });
}

export const buscarSalida = async (req: Request, res: Response) => {
    const { id } = req.params;
    const salida = await getSalida(id);
    if (salida !== null) {
        res.json(salida);
    } else {
        res.status(404).json({ message: 'No existe la salida' });
    }
}

export const agregarSalida = async (req: Request, res: Response) => {
    await postSalida(req);
    res.status(200).json({ message: 'Salida agregada correctamente' });
}

export const eliminarSalida = async (req: Request, res: Response) => {
    const { id } = req.params;
    const salida = await getSalida(id);
    if (salida !== null) {
        await deleteSalida(id);
        res.status(200).json({ message: 'Salida eliminada correctamente' });
    } else {
        res.status(404).json({ message: 'No existe la salida' });
    }
}