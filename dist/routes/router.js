"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const campos_controller_1 = require("../business_logic/controllers/campos_controller");
const roles_controller_1 = require("../business_logic/controllers/roles_controller");
const familias_controller_1 = require("../business_logic/controllers/familias_controller");
const cultivos_controller_1 = require("../business_logic/controllers/cultivos_controller");
const estados_controller_1 = require("../business_logic/controllers/estados_controller");
const registros_controller_1 = require("../business_logic/controllers/registros_controller");
const siembras_controller_1 = require("../business_logic/controllers/siembras_controller");
const usuarios_controller_1 = require("../business_logic/controllers/usuarios_controller");
const login_controller_1 = require("../business_logic/processes/login_controller");
const main_controller_1 = require("../business_logic/processes/main_controller");
const panel_controller_1 = require("../business_logic/controllers/panel_controller");
const prediccion_controller_1 = require("../business_logic/processes/prediccion_controller");
const calendar_controller_1 = require("../business_logic/controllers/calendar_controller");
const config_controller_1 = require("../business_logic/processes/config_controller");
const rotation_controller_1 = require("../business_logic/controllers/rotation_controller");
const planning_controller_1 = require("../business_logic/controllers/planning_controller");
const router = (0, express_1.Router)();
//Rutas generales
router.get('/', main_controller_1.showMain);
router.get('/login', login_controller_1.inicioSesion);
router.post('/iniciarSesion', login_controller_1.iniciarSesion);
router.get('/logout', login_controller_1.cerrarSesion);
//Rutas para recuperar contraseña
router.get('/forgot', main_controller_1.showForgot);
router.post('/enviarEmail', login_controller_1.enviarEmail);
router.get('/showRestaurar/:token/:id', login_controller_1.showRestaurar);
router.post('/restaurarContrasena/:token/:id', login_controller_1.restaurarContrasena);
//Rutas para el panel de control
router.get('/inicio', panel_controller_1.showDashboard);
router.get('/camposChart', panel_controller_1.getCamposStatsChart);
router.get('/produccionChart', panel_controller_1.getProduccionStats);
//Rutas para el calendario
router.get('/calendario', calendar_controller_1.showCalendar);
router.get('/dataCalendar', calendar_controller_1.dataCalendar);
//Rutas para reportes
router.get('/reportes/produccion', siembras_controller_1.showProduccionPorCultivo);
router.get('/reportes/uso', siembras_controller_1.showUsoCampos);
router.get('/dataUso', siembras_controller_1.dataUsoCampos);
//Rutas para la configuracion
router.get('/configuracion', config_controller_1.mostrarConfig);
router.post('/configuracion', config_controller_1.guardarConfig);
router.post('/configuracion/edit', config_controller_1.editarConfig);
//Rutas para la rotacion de cultivos
router.get('/rotacion', rotation_controller_1.mostrarRotacion);
router.get('/rotacion/getCampos', rotation_controller_1.mostrarCamposSembrados);
router.get('/rotacion/getCultivos/:campo', rotation_controller_1.mostrarCultivosRecomendados);
router.get('/rotacion/getSiembra/:campo', rotation_controller_1.mostrarSiembra);
router.get('/rotacion/getCampo/:id_campo', campos_controller_1.mostrarCampo);
router.post('/rotacion/add', rotation_controller_1.agregarRotacionDeSiembra);
//Rutas para la planificacion de actividades
router.get('/actividades/:campo', planning_controller_1.mostrarPlanificacion);
router.get('/actividades/search/:id', planning_controller_1.buscarActividad);
router.post('/actividades/add', planning_controller_1.guardarActividad);
router.post('/actividades/edit/:id', planning_controller_1.editarActividad);
router.get('/actividades/finish/:id', planning_controller_1.finalizarActividad);
router.get('/actividades/delete/:id', planning_controller_1.eliminarActividad);
router.get('/cancelEditActividad/:campo', planning_controller_1.cancelarEditarActividad);
//Rutas para usuarios
router.get('/usuarios', usuarios_controller_1.listarUsuarios);
router.get('/usuarios/:id', usuarios_controller_1.buscarUsuario);
router.post('/usuarios/add', usuarios_controller_1.agregarUsuario);
router.post('/usuarios/edit/:id', usuarios_controller_1.editarUsuario);
router.get('/usuarios/delete/:id', usuarios_controller_1.eliminarUsuario);
router.get('/usuarios/restore/:id', usuarios_controller_1.restaurarUsuario);
router.get('/usuarios/change/:id/:rol', usuarios_controller_1.cambiarRol);
router.get('/perfil', usuarios_controller_1.mostrarPerfil);
router.get('/cancelEditUser', usuarios_controller_1.cancelarEditarUsuario);
//Rutas para roles
router.get('/roles', roles_controller_1.listarRoles);
router.get('/roles/:id', roles_controller_1.buscarRol);
router.post('/roles/add', roles_controller_1.agregarRol);
router.post('/roles/edit/:id', roles_controller_1.editarRol);
router.get('/roles/delete/:id', roles_controller_1.eliminarRol);
router.get('/cancelEditRol', roles_controller_1.cancelarEditarRol);
router.get('/roles/restore/:id', roles_controller_1.restaurarRol);
//Rutas para estados
router.get('/estados', estados_controller_1.listarEstados);
router.get('/estados/:id', estados_controller_1.buscarEstado);
router.post('/estados/add', estados_controller_1.agregarEstado);
router.post('/estados/edit/:id', estados_controller_1.editarEstado);
router.get('/estados/delete/:id', estados_controller_1.eliminarEstado);
router.get('/cancelEditEstado', estados_controller_1.cancelarEditarEstado);
router.get('/estados/restore/:id', estados_controller_1.restaurarEstado);
//Rutas para familias de cultivos
router.get('/familias', familias_controller_1.listarFamilias);
router.get('/familias/:id', familias_controller_1.buscarFamilia);
router.post('/familias/add', familias_controller_1.agregarFamilia);
router.post('/familias/edit/:id', familias_controller_1.editarFamilia);
router.get('/familias/delete/:id', familias_controller_1.eliminarFamilia);
router.get('/cancelEditFamilia', familias_controller_1.cancelarEditarFamilia);
router.get('/familias/restore/:id', familias_controller_1.restaurarFamilia);
//Rutas para cultivos
router.get('/cultivos', cultivos_controller_1.listarCultivos);
router.get('/cultivos/:id', cultivos_controller_1.buscarCultivo);
router.post('/cultivos/add', cultivos_controller_1.agregarCultivo);
router.post('/cultivos/edit/:id', cultivos_controller_1.editarCultivo);
router.get('/cultivos/delete/:id', cultivos_controller_1.eliminarCultivo);
router.get('/cancelEditCultivo', cultivos_controller_1.cancelarEditarCultivo);
router.get('/cultivos/restore/:id', cultivos_controller_1.restaurarCultivo);
//Rutas para campos
router.get('/campos', campos_controller_1.mostrarCampos);
router.get('/campos/list', campos_controller_1.listarCampos);
router.get('/campos/:id', campos_controller_1.buscarCampo);
router.post('/campos/add', campos_controller_1.agregarCampo);
router.post('/campos/edit/:id', campos_controller_1.editarCampo);
router.get('/campos/delete/:id', campos_controller_1.eliminarCampo);
router.get('/trazado', campos_controller_1.mostrarTrazado);
router.get('/trazado/:id_camp/:id_cult', prediccion_controller_1.doPrediccion);
router.post('/campos/editForma/:id', campos_controller_1.editarFormaCampo);
router.get('/cancelEditCampo', campos_controller_1.cancelarEditarCampo);
router.get('/getActividad/:id_campo', planning_controller_1.showActividadActual);
//Rutas para siembras
router.get('/siembras', siembras_controller_1.listarSiembras);
router.get('/siembras/:id', siembras_controller_1.buscarSiembra);
router.post('/siembras/add', siembras_controller_1.agregarSiembra);
router.get('/siembras/delete/:id', siembras_controller_1.eliminarSiembra);
//Rutas para registros
router.get('/registros', registros_controller_1.listarRegistros);
router.get('/registros/:id', registros_controller_1.buscarRegistro);
router.post('/registros/add', registros_controller_1.agregarRegistro);
router.get('/registros/delete/:id', registros_controller_1.eliminarRegistro);
exports.default = router;
//# sourceMappingURL=router.js.map