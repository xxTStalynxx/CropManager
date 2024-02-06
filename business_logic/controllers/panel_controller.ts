import { Request, Response } from "express";
import { getDate } from "../processes/date_controller";
import { countUsuarios, getUsuario } from "../../data_access/usuarios_dta";
import { getNombre } from "../../data_access/roles_dta";
import { countCultivos, getCultivos } from "../../data_access/cultivos_dta";
import { countAllCampos, countCampos, getCampos, getNumAllCamposByEstado, getNumCamposByEstado } from "../../data_access/campos_dta";
import { countAllRegistros, countRegistros, getAllSumaProduccion, getSumaProduccion } from "../../data_access/registros_dta";
import { getEstados, getEstadosActivos } from "../../data_access/estados_dta";

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
    let numRegistros = 0;
    if (usuario?.dataValues.rol_usuario != 1){
        const campos = await getCampos(usuario?.dataValues.id);
        if (campos.length>0){
            for (let i=0; i<campos.length; i++){
                numRegistros += await countRegistros(campos[i].dataValues.id);
            }
        }
    } else {
        numRegistros = await countAllRegistros();
    }
    const totalProduccion = await getTotalProduccion(usuario?.dataValues.id);
    const stats=[
        {numUsuarios},
        {numCultivos},
        {numCampos},
        {numRegistros},
        {totalProduccion}
    ]
    return stats;
}

async function getCamposStats (id: string) {
    let estados = await getEstadosActivos();
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
    let estados = await getEstadosActivos();
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

export const getProduccionStats = async (req: Request, res: Response) => {
    let cultivos = await getCultivos();
    const usuario = await getUsuario(req.session.user);
    const year = new Date().getFullYear();
    let suma, total=0;
    if (cultivos.length > 0) {
        const campos = await getCampos(usuario?.dataValues.id);
        for (let i=0; i<cultivos.length; i++){
            if (usuario?.dataValues.rol_usuario != 1){
                for (let j=0; j<campos.length; j++){
                    suma = await getSumaProduccion(cultivos[i].dataValues.id, year, campos[j].dataValues.id);
                    if (suma === null){
                        suma = 0;
                    }
                    total += suma;
                }
                cultivos[i].dataValues.prodAnual = total;
                total = 0;
            } else {
                suma = await getAllSumaProduccion(cultivos[i].dataValues.id, year);
                if (suma === null){
                    suma = 0;
                }
                cultivos[i].dataValues.prodAnual = suma;
            }
        }
    }
    res.json(cultivos);
}

async function getTotalProduccion (id: string) {
    let cultivos = await getCultivos();
    const usuario = await getUsuario(id);
    const year = new Date().getFullYear();
    let suma=0, total=0;
    if (cultivos.length > 0) {
        const campos = await getCampos(usuario?.dataValues.id);
        for (let i=0; i<cultivos.length; i++){
            if (usuario?.dataValues.rol_usuario != 1){
                for (let j=0; j<campos.length; j++){
                    suma = await getSumaProduccion(cultivos[i].dataValues.id, year, campos[j].dataValues.id);
                    if (suma === null){
                        suma = 0;
                    }
                    total += suma;
                }
            } else {
                suma = await getAllSumaProduccion(cultivos[i].dataValues.id, year);
                if (suma === null){
                    suma = 0;
                }
                total += suma;
            }
        }
    }
    return total;
}