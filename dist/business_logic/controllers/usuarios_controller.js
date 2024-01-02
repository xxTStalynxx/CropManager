"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelarEditarUsuario = exports.mostrarPerfil = exports.cambiarRol = exports.restaurarUsuario = exports.eliminarUsuario = exports.editarUsuario = exports.agregarUsuario = exports.buscarUsuario = exports.listarUsuarios = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuarios_dta_1 = require("../../data_access/usuarios_dta");
const validations_1 = require("../validations/validations");
const roles_dta_1 = require("../../data_access/roles_dta");
const date_controller_1 = require("../processes/date_controller");
const listarUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        if ((usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario) != 1) {
            res.render('noauth');
        }
        else {
            let usuarios = yield (0, usuarios_dta_1.getUsuarios)();
            const roles = yield (0, roles_dta_1.getRolesforUsers)();
            const date = (0, date_controller_1.getDate)();
            const rolusuario = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
            let rol;
            for (let i = 0; i < usuarios.length; i++) {
                rol = yield (0, roles_dta_1.getNombre)(usuarios[i].dataValues.rol_usuario);
                usuarios[i].dataValues.rol = rol;
            }
            res.render('users', { usuarios, roles, date, usuario, rolusuario, activo: false, error: '' });
        }
    }
    else {
        res.render('login', { error: '' });
    }
});
exports.listarUsuarios = listarUsuarios;
const buscarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        const { id } = req.params;
        const usuario = yield (0, usuarios_dta_1.getUsuario)(id);
        const date = (0, date_controller_1.getDate)();
        const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
        if (usuario !== null) {
            res.render('profile_edit', { usuario, date, rol, error: '' });
        }
        else {
            res.status(404).json({ message: 'No existe el usuario' });
        }
    }
    else {
        res.render('login', { error: '' });
    }
});
exports.buscarUsuario = buscarUsuario;
const agregarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
    let usuarios = yield (0, usuarios_dta_1.getUsuarios)();
    const roles = yield (0, roles_dta_1.getRolesforUsers)();
    const date = (0, date_controller_1.getDate)();
    const rolusuario = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
    let rol;
    for (let i = 0; i < usuarios.length; i++) {
        rol = yield (0, roles_dta_1.getNombre)(usuarios[i].dataValues.rol_usuario);
        usuarios[i].dataValues.rol = rol;
    }
    if ((0, validations_1.validarEmail)(body.correo)) {
        const usuarioC = yield (0, usuarios_dta_1.searchByEmail)(body.correo);
        if (usuarioC !== null) {
            res.render('users', { usuarios, roles, date, usuario, rolusuario, activo: true, error: '* El correo ya está en uso' });
        }
        else {
            if ((0, validations_1.validarPassword)(body.contrasena)) {
                bcrypt_1.default.hash(body.contrasena, 12).then((hash) => __awaiter(void 0, void 0, void 0, function* () {
                    body.contrasena = hash;
                    yield (0, usuarios_dta_1.postUsuario)(body);
                    res.redirect('/usuarios');
                }));
            }
            else {
                res.render('users', { usuarios, roles, date, usuario, rolusuario, activo: true, error: '* La contraseña debe tener mínimo 8 caracteres, al menos un número, un caracter especial y una letra mayúscula' });
            }
        }
    }
    else {
        res.render('users', { usuarios, roles, date, usuario, rolusuario, activo: true, error: '* El correo no es válido' });
    }
});
exports.agregarUsuario = agregarUsuario;
const editarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const usuario = yield (0, usuarios_dta_1.getUsuario)(id);
    if (usuario !== null) {
        if (body.cambiarContrasena) {
            const date = (0, date_controller_1.getDate)();
            const rol = yield (0, roles_dta_1.getNombre)(usuario.dataValues.rol_usuario);
            if ((0, validations_1.validarPassword)(body.newcontrasena)) {
                if (body.newcontrasena == body.confcontrasena) {
                    bcrypt_1.default.compare(body.contrasena, usuario.dataValues.contrasena, (err, match) => __awaiter(void 0, void 0, void 0, function* () {
                        if (match || (body.contrasena == usuario.dataValues.contrasena)) {
                            bcrypt_1.default.hash(body.newcontrasena, 12).then((hash) => __awaiter(void 0, void 0, void 0, function* () {
                                body.contrasena = hash;
                                yield (0, usuarios_dta_1.putUsuario)(req);
                                res.redirect('/perfil');
                            }));
                        }
                        else {
                            res.render('profile_edit', { usuario, date, rol, error: '* La contraseña es incorrecta' });
                        }
                    }));
                }
                else {
                    res.render('profile_edit', { usuario, date, rol, error: '* Las contraseñas no coinciden' });
                }
            }
            else {
                res.render('profile_edit', { usuario, date, rol, error: '* La contraseña debe tener mínimo 8 caracteres, al menos un número, un caracter especial y una letra mayúscula' });
            }
        }
        else {
            yield (0, usuarios_dta_1.putNombreUsuario)(req);
            res.redirect('/perfil');
        }
    }
    else {
        res.status(404).json({ message: 'No existe el usuario' });
    }
});
exports.editarUsuario = editarUsuario;
const eliminarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield (0, usuarios_dta_1.getUsuario)(id);
    if (usuario !== null) {
        yield (0, usuarios_dta_1.deleteUsuario)(id);
        res.redirect('/usuarios');
    }
    else {
        res.status(404).json({ message: 'No existe el usuario' });
    }
});
exports.eliminarUsuario = eliminarUsuario;
const restaurarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield (0, usuarios_dta_1.getUsuario)(id);
    if (usuario !== null) {
        yield (0, usuarios_dta_1.restoreUsuario)(id);
        res.redirect('/usuarios');
    }
    else {
        res.status(404).json({ message: 'No existe el usuario' });
    }
});
exports.restaurarUsuario = restaurarUsuario;
const cambiarRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield (0, usuarios_dta_1.getUsuario)(id);
    if (usuario !== null) {
        yield (0, usuarios_dta_1.changeRol)(req);
        res.redirect('/usuarios');
    }
    else {
        res.status(404).json({ message: 'No existe el usuario' });
    }
});
exports.cambiarRol = cambiarRol;
const mostrarPerfil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        const date = (0, date_controller_1.getDate)();
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        const rol = yield (0, roles_dta_1.getRol)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
        res.render('profile', { date, usuario, rol });
    }
    else {
        res.render('login', { error: '' });
    }
});
exports.mostrarPerfil = mostrarPerfil;
const cancelarEditarUsuario = (req, res) => {
    res.redirect('/perfil');
};
exports.cancelarEditarUsuario = cancelarEditarUsuario;
//# sourceMappingURL=usuarios_controller.js.map