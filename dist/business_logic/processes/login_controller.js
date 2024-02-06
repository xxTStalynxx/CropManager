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
exports.restaurarContrasena = exports.enviarEmail = exports.showRestaurar = exports.cerrarSesion = exports.iniciarSesion = exports.inicioSesion = void 0;
const usuarios_dta_1 = require("../../data_access/usuarios_dta");
const bcrypt_1 = __importDefault(require("bcrypt"));
const mail_controller_1 = require("./mail_controller");
const template_1 = require("../../views/template");
const validations_1 = require("../validations/validations");
const inicioSesion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        res.redirect('/inicio');
    }
    else {
        res.render('login', { error: '' });
    }
});
exports.inicioSesion = inicioSesion;
const iniciarSesion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const usuario = yield (0, usuarios_dta_1.searchByEmail)(body.correo);
    if (usuario !== null) {
        bcrypt_1.default.compare(body.contrasena, usuario.dataValues.contrasena, (err, match) => {
            if (match || (body.contrasena == usuario.dataValues.contrasena)) {
                req.session.regenerate(function (err) {
                    req.session.user = usuario.dataValues.id;
                    req.session.save(function (err) {
                        res.redirect('/inicio');
                    });
                });
            }
            else {
                res.render('login', { error: '* La contraseña es incorrecta' });
            }
        });
    }
    else {
        res.render('login', { error: '* Este usuario no está registrado' });
    }
});
exports.iniciarSesion = iniciarSesion;
const cerrarSesion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        req.session.destroy((err) => {
            res.redirect('/login');
        });
    }
    else {
        res.render('login', { error: '' });
    }
});
exports.cerrarSesion = cerrarSesion;
const showRestaurar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, id } = req.params;
    if (req.session.user) {
        res.redirect('/inicio');
    }
    else {
        res.render('restore', { token, id, error: '' });
    }
});
exports.showRestaurar = showRestaurar;
const enviarEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const usuario = yield (0, usuarios_dta_1.searchByEmail)(body.correo);
    if (usuario !== null) {
        const token = (0, mail_controller_1.generarToken)(16);
        const htmlTemplate = (0, template_1.getEmailTemplate)(token, usuario.dataValues.nombre, usuario.dataValues.id);
        yield (0, mail_controller_1.sendEmail)(body.correo, "Restaurar contraseña", htmlTemplate);
        res.redirect('/login');
    }
    else {
        res.render('forgot', { error: '* Este correo no está registrado' });
    }
});
exports.enviarEmail = enviarEmail;
const restaurarContrasena = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { token, id } = req.params;
    if (token) {
        if ((0, validations_1.validarPassword)(body.newcontrasena)) {
            if (body.newcontrasena == body.confcontrasena) {
                bcrypt_1.default.hash(body.newcontrasena, 12).then((hash) => __awaiter(void 0, void 0, void 0, function* () {
                    body.contrasena = hash;
                    yield (0, usuarios_dta_1.putUsuario)(req);
                    res.redirect('/login');
                }));
            }
            else {
                res.render('restore', { token, id, error: '* Las contraseñas no coinciden' });
            }
        }
        else {
            res.render('restore', { token, id, error: '* La contraseña debe tener mínimo 8 caracteres, al menos un número, un caracter especial y una letra mayúscula' });
        }
    }
});
exports.restaurarContrasena = restaurarContrasena;
//# sourceMappingURL=login_controller.js.map