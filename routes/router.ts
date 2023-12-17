import { Router } from "express";

import { agregarCampo, buscarCampo, cancelarEditarCampo, editarCampo, eliminarCampo, listarCampos,mostrarCampos, mostrarTrazado } from '../business_logic/controllers/campos_controller';
import { agregarRol, buscarRol, cancelarEditarRol, editarRol, eliminarRol, listarRoles, restaurarRol } from "../business_logic/controllers/roles_controller";
import { agregarFamilia, buscarFamilia, cancelarEditarFamilia, editarFamilia, eliminarFamilia, listarFamilias, restaurarFamilia } from "../business_logic/controllers/familias_controller";
import { agregarCultivo, buscarCultivo, cancelarEditarCultivo, editarCultivo, eliminarCultivo, listarCultivos, restaurarCultivo } from "../business_logic/controllers/cultivos_controller";
import { agregarEstado, buscarEstado, cancelarEditarEstado, editarEstado, eliminarEstado, listarEstados, restaurarEstado } from "../business_logic/controllers/estados_controller";
import { agregarRegistro, buscarRegistro, eliminarRegistro, listarRegistros } from "../business_logic/controllers/registros_controller";
import { agregarSiembra, buscarSiembra, eliminarSiembra, listarSiembras } from "../business_logic/controllers/siembras_controller";
import { agregarUsuario, buscarUsuario, cambiarRol, cancelarEditarUsuario, editarUsuario, eliminarUsuario, listarUsuarios, mostrarPerfil, restaurarUsuario } from "../business_logic/controllers/usuarios_controller";
import { cerrarSesion, enviarEmail, iniciarSesion, inicioSesion, restaurarContrasena, showRegistro, showRestaurar } from "../business_logic/processes/login_controller";
import { showCropManager, showForgot, showMain, showNosotros } from "../business_logic/processes/main_controller";
import { getCamposStatsChart, getProduccionStats, showDashboard } from "../business_logic/controllers/panel_controller";
import { doPrediccion } from "../business_logic/processes/prediccion_controller";
import { dataCalendar, showCalendar } from "../business_logic/controllers/calendar_controller";
import { editarConfig, guardarConfig, mostrarConfig } from "../business_logic/processes/config_controller";

const router = Router();

//Rutas generales
router.get('/', showMain);
router.get('/login', inicioSesion);
router.post('/iniciarSesion', iniciarSesion);
router.get('/logout', cerrarSesion);
router.get('/registro', showRegistro);
router.get('/nosotros', showNosotros);
router.get('/cropmanager', showCropManager);

//Rutas para recuperar contraseña
router.get('/forgot', showForgot);
router.post('/enviarEmail', enviarEmail);
router.get('/showRestaurar/:token/:id', showRestaurar);
router.post('/restaurarContrasena/:token/:id', restaurarContrasena);

//Rutas para el panel de control
router.get('/inicio', showDashboard);
router.get('/camposChart', getCamposStatsChart);
router.get('/produccionChart', getProduccionStats);

//Rutas para el calendario
router.get('/calendario', showCalendar);
router.get('/dataCalendar', dataCalendar);

//Rutas para la configuracion
router.get('/configuracion', mostrarConfig);
router.post('/configuracion', guardarConfig);
router.post('/configuracion/edit', editarConfig);

//Rutas para usuarios
router.get('/usuarios', listarUsuarios);
router.get('/usuarios/:id', buscarUsuario);
router.post('/usuarios/add', agregarUsuario);
router.post('/usuarios/edit/:id', editarUsuario);
router.get('/usuarios/delete/:id', eliminarUsuario);
router.get('/usuarios/restore/:id', restaurarUsuario);
router.get('/usuarios/change/:id/:rol', cambiarRol);
router.get('/perfil', mostrarPerfil);
router.get('/cancelEditUser', cancelarEditarUsuario);

//Rutas para roles
router.get('/roles', listarRoles);
router.get('/roles/:id', buscarRol);
router.post('/roles/add', agregarRol);
router.post('/roles/edit/:id', editarRol);
router.get('/roles/delete/:id', eliminarRol);
router.get('/cancelEditRol', cancelarEditarRol);
router.get('/roles/restore/:id', restaurarRol);

//Rutas para estados
router.get('/estados', listarEstados);
router.get('/estados/:id', buscarEstado);
router.post('/estados/add', agregarEstado);
router.post('/estados/edit/:id', editarEstado);
router.get('/estados/delete/:id', eliminarEstado);
router.get('/cancelEditEstado', cancelarEditarEstado);
router.get('/estados/restore/:id', restaurarEstado);

//Rutas para familias de cultivos
router.get('/familias', listarFamilias);
router.get('/familias/:id', buscarFamilia);
router.post('/familias/add', agregarFamilia);
router.post('/familias/edit/:id', editarFamilia);
router.get('/familias/delete/:id', eliminarFamilia);
router.get('/cancelEditFamilia', cancelarEditarFamilia);
router.get('/familias/restore/:id', restaurarFamilia);

//Rutas para cultivos
router.get('/cultivos', listarCultivos);
router.get('/cultivos/:id', buscarCultivo);
router.post('/cultivos/add', agregarCultivo);
router.post('/cultivos/edit/:id', editarCultivo);
router.get('/cultivos/delete/:id', eliminarCultivo);
router.get('/cancelEditCultivo', cancelarEditarCultivo);
router.get('/cultivos/restore/:id', restaurarCultivo);

//Rutas para campos
router.get('/campos', mostrarCampos);
router.get('/campos/list', listarCampos);
router.get('/campos/:id', buscarCampo);
router.post('/campos/add', agregarCampo);
router.post('/campos/edit/:id', editarCampo);
router.get('/campos/delete/:id', eliminarCampo);
router.get('/trazado', mostrarTrazado);
router.get('/trazado/:id_camp/:id_cult', doPrediccion);
router.get('/cancelEditCampo', cancelarEditarCampo);

//Rutas para siembras
router.get('/siembras', listarSiembras);
router.get('/siembras/:id', buscarSiembra);
router.post('/siembras/add', agregarSiembra);
router.get('/siembras/delete/:id', eliminarSiembra);

//Rutas para registros
router.get('/registros', listarRegistros);
router.get('/registros/:id', buscarRegistro);
router.post('/registros/add', agregarRegistro);
router.get('/registros/delete/:id', eliminarRegistro);

export default router;