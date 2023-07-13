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
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarRegistro = exports.agregarRegistro = exports.buscarRegistro = exports.listarRegistros = void 0;
const registros_dta_1 = require("../../data_access/registros_dta");
const date_controller_1 = require("../processes/date_controller");
const usuarios_dta_1 = require("../../data_access/usuarios_dta");
const roles_dta_1 = require("../../data_access/roles_dta");
const listarRegistros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
        const registros = yield (0, registros_dta_1.getRegistros)();
        const date = (0, date_controller_1.getDate)();
        res.render('records', { registros, date, usuario, rol });
    }
    else {
        res.render('login', { error: '' });
    }
});
exports.listarRegistros = listarRegistros;
const buscarRegistro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const registro = yield (0, registros_dta_1.getRegistro)(id);
    if (registro !== null) {
        res.json(registro);
    }
    else {
        res.status(404).json({ message: 'No existe el registro' });
    }
});
exports.buscarRegistro = buscarRegistro;
const agregarRegistro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    if (yield (0, registros_dta_1.searchRegistro)(body.campo)) {
        res.status(404).json({ message: 'No se pueden registrar 2 siembras en el mismo campo' });
    }
    else {
        yield (0, registros_dta_1.postRegistro)(req);
        res.status(200).json({ message: 'Registro agregado correctamente' });
    }
});
exports.agregarRegistro = agregarRegistro;
const eliminarRegistro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const registro = yield (0, registros_dta_1.getRegistro)(id);
    if (registro !== null) {
        yield (0, registros_dta_1.deleteRegistro)(id);
        res.status(200).json({ message: 'Registro eliminado correctamente' });
    }
    else {
        res.status(404).json({ message: 'No existe el registro' });
    }
});
exports.eliminarRegistro = eliminarRegistro;
//# sourceMappingURL=registros_controller.js.map