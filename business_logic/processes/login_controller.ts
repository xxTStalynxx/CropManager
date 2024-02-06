import { Request, Response } from "express";
import { putUsuario, searchByEmail } from "../../data_access/usuarios_dta";
import bcrypt from 'bcrypt';
import { generarToken, sendEmail } from "./mail_controller";
import { getEmailTemplate } from "../../views/template";
import { validarPassword } from "../validations/validations";

export const inicioSesion = async (req: Request, res: Response) => {
    if (req.session.user) {
        res.redirect('/inicio');
    } else {
        res.render('login', { error: '' });
    }
}

export const iniciarSesion = async (req: Request, res: Response) => {
    const { body } = req;
    const usuario = await searchByEmail(body.correo);
    if (usuario !== null) {
        bcrypt.compare(body.contrasena, usuario.dataValues.contrasena, (err, match) => {
            if (match || (body.contrasena == usuario.dataValues.contrasena)) {
                req.session.regenerate(function (err) {
                    req.session.user = usuario.dataValues.id;
                    req.session.save(function (err) {
                        res.redirect('/inicio');
                    })
                });
            } else {
                res.render('login', { error: '* La contraseña es incorrecta' });
            }
        });
    } else {
        res.render('login', { error: '* Este usuario no está registrado' });
    }
}

export const cerrarSesion = async (req: Request, res: Response) => {
    if (req.session.user) {
        req.session.destroy((err: any) => {
            res.redirect('/login');
        });
    } else {
        res.render('login', { error: '' });
    }
}

export const showRestaurar = async (req: Request, res: Response) => {
    const { token, id } = req.params;
    if (req.session.user) {
        res.redirect('/inicio');
    } else {
        res.render('restore', { token, id, error: '' });
    }
}

export const enviarEmail = async (req: Request, res: Response) => {
    const { body } = req;
    const usuario = await searchByEmail(body.correo);
    if (usuario !== null) {
        const token = generarToken(16);
        const htmlTemplate = getEmailTemplate(token, usuario.dataValues.nombre, usuario.dataValues.id);
        await sendEmail(body.correo, "Restaurar contraseña", htmlTemplate);
        res.redirect('/login');
    } else {
        res.render('forgot', { error: '* Este correo no está registrado' });
    }
}

export const restaurarContrasena = async (req: Request, res: Response) => {
    const { body } = req;
    const { token, id } = req.params;
    if (token) {
        if (validarPassword(body.newcontrasena)) {
            if (body.newcontrasena == body.confcontrasena) {
                bcrypt.hash(body.newcontrasena, 12).then(async hash => {
                    body.contrasena = hash;
                    await putUsuario(req);
                    res.redirect('/login');
                });
            } else {
                res.render('restore', { token, id, error: '* Las contraseñas no coinciden' });
            }
        } else {
            res.render('restore', { token, id, error: '* La contraseña debe tener mínimo 8 caracteres, al menos un número, un caracter especial y una letra mayúscula' });
        }
    }
}