import { Request, Response } from "express";
import { deleteRegistro, getRegistro, getRegistros, postRegistro, searchRegistro } from "../../data_access/registros_dta";
import { getDate } from "../processes/date_controller";
import { getUsuario } from "../../data_access/usuarios_dta";
import { getNombre } from "../../data_access/roles_dta";

export const listarRegistros = async (req: Request, res: Response) => {
    if (req.session.user){
        const usuario = await getUsuario(req.session.user);
        const rol = await getNombre(usuario?.dataValues.rol_usuario);
        const registros = await getRegistros();
        const date = getDate();
        res.render('records', { registros, date, usuario, rol });
    } else {
        res.render('login', { error: '' });
    }
}

export const buscarRegistro = async (req: Request, res: Response) => {
    const { id } = req.params;
    const registro = await getRegistro(id);
    if (registro !== null) {
        res.json(registro);
    } else {
        res.status(404).json({ message: 'No existe el registro' });
    }
}

export const agregarRegistro = async (req: Request, res: Response) => {
    const { body } = req;
    if (await searchRegistro(body.campo)) {
        res.status(404).json({ message: 'No se pueden registrar 2 siembras en el mismo campo' });
    }
    else {
        await postRegistro(req);
        res.status(200).json({ message: 'Registro agregado correctamente' });
    }
}

export const eliminarRegistro = async (req: Request, res: Response) => {
    const { id } = req.params;
    const registro = await getRegistro(id);
    if (registro !== null) {
        await deleteRegistro(id);
        res.status(200).json({ message: 'Registro eliminado correctamente' });
    } else {
        res.status(404).json({ message: 'No existe el registro' });
    }
}