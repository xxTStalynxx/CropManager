import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { changeRol, deleteUsuario, getUsuario, getUsuarios, postUsuario, putNombreUsuario, putUsuario, restoreUsuario, searchByEmail } from "../../data_access/usuarios_dta";
import { validarEmail, validarPassword } from "../validations/validations";
import { getNombre, getRol, getRolesforUsers } from "../../data_access/roles_dta";
import { getDate } from "../processes/date_controller";

export const listarUsuarios = async (req: Request, res: Response) => {
    if (req.session.user) {
        const usuario = await getUsuario(req.session.user);
        if (usuario?.dataValues.rol_usuario != 1) {
            res.render('noauth');
        } else {
            let usuarios = await getUsuarios();
            const roles = await getRolesforUsers();
            const date = getDate();
            const rolusuario = await getNombre(usuario?.dataValues.rol_usuario);
            let rol;
            for (let i = 0; i < usuarios.length; i++) {
                rol = await getNombre(usuarios[i].dataValues.rol_usuario);
                usuarios[i].dataValues.rol = rol;
            }
            res.render('users', { usuarios, roles, date, usuario, rolusuario, activo: false, error: '' });
        }
    } else {
        res.render('login', { error: '' });
    }
}

export const buscarUsuario = async (req: Request, res: Response) => {
    if (req.session.user) {
        const { id } = req.params;
        const usuario = await getUsuario(id);
        const date = getDate();
        const rol = await getNombre(usuario?.dataValues.rol_usuario);
        if (usuario !== null) {
            res.render('profile_edit', { usuario, date, rol, error: '' });
        } else {
            res.status(404).json({ message: 'No existe el usuario' });
        }
    } else {
        res.render('login', { error: '' });
    }
}

export const agregarUsuario = async (req: Request, res: Response) => {
    const { body } = req;
    const usuario = await getUsuario(req.session.user);
    let usuarios = await getUsuarios();
    const roles = await getRolesforUsers();
    const date = getDate();
    const rolusuario = await getNombre(usuario?.dataValues.rol_usuario);
    let rol;
    for (let i = 0; i < usuarios.length; i++) {
        rol = await getNombre(usuarios[i].dataValues.rol_usuario);
        usuarios[i].dataValues.rol = rol;
    }

    if (validarEmail(body.correo)) {
        const usuarioC = await searchByEmail(body.correo);
        if (usuarioC !== null) {
            res.render('users', { usuarios, roles, date, usuario, rolusuario, activo: true, error: '* El correo ya está en uso' });
        } else {
            if (validarPassword(body.contrasena)) {
                bcrypt.hash(body.contrasena, 12).then(async hash => {
                    body.contrasena = hash;
                    await postUsuario(body);
                    res.redirect('/usuarios');
                });
            } else {
                res.render('users', { usuarios, roles, date, usuario, rolusuario, activo: true, error: '* La contraseña debe tener mínimo 8 caracteres, al menos un número, un caracter especial y una letra mayúscula' });
            }
        }
    } else {
        res.render('users', { usuarios, roles, date, usuario, rolusuario, activo: true, error: '* El correo no es válido' });
    }
}

export const editarUsuario = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;
    const usuario = await getUsuario(id);
    if (usuario !== null) {
        if (body.cambiarContrasena) {
            const date = getDate();
            const rol = await getNombre(usuario.dataValues.rol_usuario);
            if (validarPassword(body.newcontrasena)) {
                if (body.newcontrasena == body.confcontrasena) {
                    bcrypt.compare(body.contrasena, usuario.dataValues.contrasena, async (err, match) => {
                        if (match || (body.contrasena == usuario.dataValues.contrasena)) {
                            bcrypt.hash(body.newcontrasena, 12).then(async hash => {
                                body.contrasena = hash;
                                await putUsuario(req);
                                res.redirect('/perfil');
                            });
                        } else {
                            res.render('profile_edit', { usuario, date, rol, error: '* La contraseña es incorrecta' });
                        }
                    });
                } else {
                    res.render('profile_edit', { usuario, date, rol, error: '* Las contraseñas no coinciden' });
                }
            } else {
                res.render('profile_edit', { usuario, date, rol, error: '* La contraseña debe tener mínimo 8 caracteres, al menos un número, un caracter especial y una letra mayúscula' });
            }
        } else {
            await putNombreUsuario(req);
            res.redirect('/perfil');
        }
    } else {
        res.status(404).json({ message: 'No existe el usuario' });
    }
}

export const eliminarUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const usuario = await getUsuario(id);
    if (usuario !== null) {
        await deleteUsuario(id);
        res.redirect('/usuarios');
    } else {
        res.status(404).json({ message: 'No existe el usuario' });
    }
}

export const restaurarUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const usuario = await getUsuario(id);
    if (usuario !== null) {
        await restoreUsuario(id);
        res.redirect('/usuarios');
    } else {
        res.status(404).json({ message: 'No existe el usuario' });
    }
}

export const cambiarRol = async (req: Request, res: Response) => {
    const { id } = req.params;
    const usuario = await getUsuario(id);
    if (usuario !== null) {
        await changeRol(req);
        res.redirect('/usuarios');
    } else {
        res.status(404).json({ message: 'No existe el usuario' });
    }
}

export const mostrarPerfil = async (req: Request, res: Response) => {
    if (req.session.user) {
        const date = getDate();
        const usuario = await getUsuario(req.session.user);
        const rol = await getRol(usuario?.dataValues.rol_usuario);
        res.render('profile', { date, usuario, rol });
    } else {
        res.render('login', { error: '' });
    }
}

export const cancelarEditarUsuario = (req: Request, res: Response) => {
    res.redirect('/perfil');
};