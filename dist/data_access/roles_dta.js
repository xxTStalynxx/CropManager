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
exports.getNombre = exports.searchRol = exports.restoreRol = exports.deleteRol = exports.putRol = exports.postRol = exports.getRol = exports.getRolesforUsers = exports.getRoles = void 0;
const rol_1 = __importDefault(require("../models/rol"));
const getRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield rol_1.default.findAll();
    return roles;
});
exports.getRoles = getRoles;
const getRolesforUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield rol_1.default.findAll({
        where: { activo: true },
    });
    return roles;
});
exports.getRolesforUsers = getRolesforUsers;
const getRol = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const rol = yield rol_1.default.findByPk(id);
    if (rol) {
        return rol;
    }
    else {
        return null;
    }
});
exports.getRol = getRol;
const postRol = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const rol = yield rol_1.default.create({
        nombre: body.nombre,
        descripcion: body.descripcion,
    });
    yield rol.save();
});
exports.postRol = postRol;
const putRol = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const rol = yield rol_1.default.findByPk(id);
    if (rol) {
        yield rol.update(body);
    }
});
exports.putRol = putRol;
const deleteRol = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const rol = yield rol_1.default.findByPk(id);
    if (rol) {
        yield rol.update({ activo: false });
    }
});
exports.deleteRol = deleteRol;
const restoreRol = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const rol = yield rol_1.default.findByPk(id);
    if (rol) {
        yield rol.update({ activo: true });
    }
});
exports.restoreRol = restoreRol;
const searchRol = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    const rol = yield rol_1.default.findOne({
        where: { nombre: nombre },
    });
    if (rol) {
        return true;
    }
    else {
        return false;
    }
});
exports.searchRol = searchRol;
const getNombre = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const rol = yield rol_1.default.findByPk(id);
    if (rol) {
        return rol.dataValues.nombre;
    }
});
exports.getNombre = getNombre;
//# sourceMappingURL=roles_dta.js.map