"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const campos_controller_1 = require("../business_logic/controllers/campos_controller");
const roles_controller_1 = require("../business_logic/controllers/roles_controller");
const cultivos_controller_1 = require("../business_logic/controllers/cultivos_controller");
const cultivos_salida_controller_1 = require("../business_logic/controllers/cultivos_salida_controller");
const estados_controller_1 = require("../business_logic/controllers/estados_controller");
const registros_controller_1 = require("../business_logic/controllers/registros_controller");
const salidas_controller_1 = require("../business_logic/controllers/salidas_controller");
const siembras_controller_1 = require("../business_logic/controllers/siembras_controller");
const usuarios_controller_1 = require("../business_logic/controllers/usuarios_controller");
const login_controller_1 = require("../business_logic/processes/login_controller");
const main_controller_1 = require("../business_logic/processes/main_controller");
const panel_controller_1 = require("../business_logic/controllers/panel_controller");
const router = (0, express_1.Router)();
//Rutas generales
router.get('/', main_controller_1.showMain);
router.get('/login', login_controller_1.inicioSesion);
router.post('/iniciarSesion', login_controller_1.iniciarSesion);
router.get('/logout', login_controller_1.cerrarSesion);
router.get('/registro', login_controller_1.showRegistro);
//Rutas para recuperar contraseña
router.get('/forgot', main_controller_1.showForgot);
router.post('/enviarEmail', login_controller_1.enviarEmail);
router.get('/showRestaurar/:token/:id', login_controller_1.showRestaurar);
router.post('/restaurarContrasena/:token/:id', login_controller_1.restaurarContrasena);
//Rutas para el panel de control
router.get('/inicio', panel_controller_1.showDashboard);
router.get('/camposChart', panel_controller_1.getCamposStatsChart);
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
router.put('/campos/edit/:id', campos_controller_1.editarCampo);
router.get('/campos/delete/:id', campos_controller_1.eliminarCampo);
router.get('/trazado', campos_controller_1.mostrarTrazado);
//Rutas para siembras
router.get('/siembras', siembras_controller_1.listarSiembras);
router.get('/siembras/:id', siembras_controller_1.buscarSiembra);
router.post('/siembras/add', siembras_controller_1.agregarSiembra);
router.delete('/siembras/delete/:id', siembras_controller_1.eliminarSiembra);
//Rutas para registros
router.get('/registros', registros_controller_1.listarRegistros);
router.get('/registros/:id', registros_controller_1.buscarRegistro);
router.post('/registros/add', registros_controller_1.agregarRegistro);
router.delete('/registros/delete/:id', registros_controller_1.eliminarRegistro);
//Rutas para salidas
router.get('/salidas', salidas_controller_1.listarSalidas);
router.get('/salidas/:id', salidas_controller_1.buscarSalida);
router.post('/salidas/add', salidas_controller_1.agregarSalida);
router.delete('/salidas/delete/:id', salidas_controller_1.eliminarSalida);
//Rutas para cultivos_salida
router.get('/cultivos_salida', cultivos_salida_controller_1.listarCultivo_salidas);
router.get('/cultivos_salida/:id', cultivos_salida_controller_1.buscarCultivo_salida);
router.post('/cultivos_salida/add', cultivos_salida_controller_1.agregarCultivo_salida);
exports.default = router;
//# sourceMappingURL=router.js.map