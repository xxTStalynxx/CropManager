import { Request, Response } from "express";
import { getDate } from "../processes/date_controller";
import { getUsuario } from "../../data_access/usuarios_dta";
import { getNombre } from "../../data_access/roles_dta";

export const showDashboard = async (req: Request, res: Response) => {
    if (req.session.user){
        const date = getDate();
        const usuario = await getUsuario(req.session.user);
        const rol = await getNombre(usuario?.dataValues.rol_usuario);
        res.render('dashboard', { usuario, date, rol });
    } else {
        res.render('login', { error: '' });
    }
}