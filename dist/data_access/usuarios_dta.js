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
exports.countUsuarios = exports.changeRol = exports.getNombreUsuario = exports.searchByEmail = exports.restoreUsuario = exports.deleteUsuario = exports.putNombreUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuariosActivos = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const sequelize_1 = require("sequelize");
const getUsuarios = () => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll();
    return usuarios;
});
exports.getUsuarios = getUsuarios;
const getUsuario = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        return usuario;
    }
    else {
        return null;
    }
});
exports.getUsuario = getUsuario;
const getUsuariosActivos = () => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll({
        where: { activo: true }
    });
    return usuarios;
});
exports.getUsuariosActivos = getUsuariosActivos;
const postUsuario = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.create({
        nombre: body.nombre,
        correo: body.correo,
        contrasena: body.contrasena,
    });
    yield usuario.save();
});
exports.postUsuario = postUsuario;
const putUsuario = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        yield usuario.update(body);
    }
});
exports.putUsuario = putUsuario;
const putNombreUsuario = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        yield usuario.update({
            nombre: body.nombre,
        });
    }
});
exports.putNombreUsuario = putNombreUsuario;
const deleteUsuario = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        yield usuario.update({ activo: false });
    }
});
exports.deleteUsuario = deleteUsuario;
const restoreUsuario = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        yield usuario.update({ activo: true });
    }
});
exports.restoreUsuario = restoreUsuario;
const searchByEmail = (correo) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findOne({
        where: {
            [sequelize_1.Op.and]: [
                { correo: correo },
                { activo: true }
            ]
        }
    });
    if (usuario) {
        return usuario;
    }
    else {
        return null;
    }
});
exports.searchByEmail = searchByEmail;
const getNombreUsuario = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        return usuario.dataValues.nombre;
    }
});
exports.getNombreUsuario = getNombreUsuario;
const changeRol = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, rol } = req.params;
    const nuevoRU = {
        rol_usuario: rol,
    };
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        yield usuario.update(nuevoRU);
    }
});
exports.changeRol = changeRol;
const countUsuarios = () => __awaiter(void 0, void 0, void 0, function* () {
    const nu = usuario_1.default.count();
    return nu;
});
exports.countUsuarios = countUsuarios;
//# sourceMappingURL=usuarios_dta.js.map