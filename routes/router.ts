import { Router } from "express";

import { agregarCampo, buscarCampo, editarCampo, eliminarCampo, listarCampos,mostrarCampos,mostrarListaCampos,mostrarTrazado } from '../business_logic/controllers/campos_controller';
import { agregarRol, buscarRol, cancelarEditarRol, editarRol, eliminarRol, listarRoles, restaurarRol } from "../business_logic/controllers/roles_controller";
import { agregarCultivo, buscarCultivo, cancelarEditarCultivo, editarCultivo, eliminarCultivo, listarCultivos, restaurarCultivo } from "../business_logic/controllers/cultivos_controller";
import { agregarCultivo_salida, buscarCultivo_salida, listarCultivo_salidas } from "../business_logic/controllers/cultivos_salida_controller";
import { agregarEstado, buscarEstado, cancelarEditarEstado, editarEstado, eliminarEstado, listarEstados, restaurarEstado } from "../business_logic/controllers/estados_controller";
import { agregarRegistro, buscarRegistro, eliminarRegistro, listarRegistros } from "../business_logic/controllers/registros_controller";
import { agregarSalida, buscarSalida, eliminarSalida, listarSalidas } from "../business_logic/controllers/salidas_controller";
import { agregarSiembra, buscarSiembra, eliminarSiembra, listarSiembras } from "../business_logic/controllers/siembras_controller";
import { agregarUsuario, buscarUsuario, cambiarRol, cancelarEditarUsuario, editarUsuario, eliminarUsuario, listarUsuarios, mostrarPerfil, restaurarUsuario } from "../business_logic/controllers/usuarios_controller";
import { cerrarSesion, enviarEmail, iniciarSesion, inicioSesion, restaurarContrasena, showRegistro, showRestaurar } from "../business_logic/processes/login_controller";
import { showForgot, showMain } from "../business_logic/processes/main_controller";
import { getCamposStatsChart, showDashboard } from "../business_logic/controllers/panel_controller";

const router = Router();

//Rutas generales
router.get('/', showMain);
router.get('/login', inicioSesion);
router.post('/iniciarSesion', iniciarSesion);
router.get('/logout', cerrarSesion);
router.get('/registro', showRegistro);

//Rutas para recuperar contraseña
router.get('/forgot', showForgot);
router.post('/enviarEmail', enviarEmail);
router.get('/showRestaurar/:token/:id', showRestaurar);
router.post('/restaurarContrasena/:token/:id', restaurarContrasena);

//Rutas para el panel de control
router.get('/inicio', showDashboard);
router.get('/camposChart', getCamposStatsChart);

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
router.put('/campos/edit/:id', editarCampo);
router.get('/campos/delete/:id', eliminarCampo);
router.get('/trazado', mostrarTrazado);

//Rutas para siembras
router.get('/siembras', listarSiembras);
router.get('/siembras/:id', buscarSiembra);
router.post('/siembras/add', agregarSiembra);
router.delete('/siembras/delete/:id', eliminarSiembra);

//Rutas para registros
router.get('/registros', listarRegistros);
router.get('/registros/:id', buscarRegistro);
router.post('/registros/add', agregarRegistro);
router.delete('/registros/delete/:id', eliminarRegistro);

//Rutas para salidas
router.get('/salidas', listarSalidas);
router.get('/salidas/:id', buscarSalida);
router.post('/salidas/add', agregarSalida);
router.delete('/salidas/delete/:id', eliminarSalida);

//Rutas para cultivos_salida
router.get('/cultivos_salida', listarCultivo_salidas);
router.get('/cultivos_salida/:id', buscarCultivo_salida);
router.post('/cultivos_salida/add', agregarCultivo_salida);

export default router;