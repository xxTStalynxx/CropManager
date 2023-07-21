import { Request, Response } from "express";
import { getDate } from "../processes/date_controller";
import { countUsuarios, getUsuario } from "../../data_access/usuarios_dta";
import { getNombre } from "../../data_access/roles_dta";
import { countCultivos } from "../../data_access/cultivos_dta";
import { countAllCampos, countCampos, getNumAllCamposByEstado } from "../../data_access/campos_dta";
import { countRegistros } from "../../data_access/registros_dta";
import { getNumCamposByEstado } from "../../data_access/campos_dta";
import { getEstados } from "../../data_access/estados_dta";

export const showDashboard = async (req: Request, res: Response) => {
    if (req.session.user){
        const date = getDate();
        const stats = await getStats(req.session.user);
        const estados = await getCamposStats(req.session.user);
        const usuario = await getUsuario(req.session.user);
        const rol = await getNombre(usuario?.dataValues.rol_usuario);
        res.render('dashboard', { usuario, estados, date, rol, stats });
    } else {
        res.render('login', { error: '' });
    }
}

async function getStats (id: string){
    const numUsuarios = await countUsuarios();
    const numCultivos = await countCultivos();
    let numCampos;
    const usuario = await getUsuario(id);
    if (usuario?.dataValues.rol_usuario != 1){
        numCampos = await countCampos(usuario?.dataValues.id);
    } else {
        numCampos = await countAllCampos();
    }
    const numRegistros = await countRegistros();
    const stats=[
        {numUsuarios},
        {numCultivos},
        {numCampos},
        {numRegistros}
    ]
    return stats;
}

async function getCamposStats (id: string) {
    let estados = await getEstados();
    const usuario = await getUsuario(id);
    if (estados.length > 0){
        for (let i=0; i<estados.length; i++){
            if (usuario?.dataValues.rol_usuario != 1){
                estados[i].dataValues.numCampos = await getNumCamposByEstado(estados[i].dataValues.id, usuario?.dataValues.id);
            } else {
                estados[i].dataValues.numCampos = await getNumAllCamposByEstado(estados[i].dataValues.id);
            }
        }
    }
    return estados;
}

export const getCamposStatsChart =async (req: Request, res: Response) => {
    let estados = await getEstados();
    const usuario = await getUsuario(req.session.user);
    if (estados.length > 0){
        for (let i=0; i<estados.length; i++){
            if (usuario?.dataValues.rol_usuario != 1){
                estados[i].dataValues.numCampos = await getNumCamposByEstado(estados[i].dataValues.id, usuario?.dataValues.id);
            } else {
                estados[i].dataValues.numCampos = await getNumAllCamposByEstado(estados[i].dataValues.id);
            }
        }
    }
    res.json(estados);
}