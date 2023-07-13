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
exports.searchRegistro = exports.deleteRegistro = exports.postRegistro = exports.getRegistro = exports.getRegistros = void 0;
const registro_1 = __importDefault(require("../models/registro"));
const getRegistros = () => __awaiter(void 0, void 0, void 0, function* () {
    const registros = yield registro_1.default.findAll();
    return registros;
});
exports.getRegistros = getRegistros;
const getRegistro = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const registro = yield registro_1.default.findByPk(id);
    if (registro) {
        return registro;
    }
    else {
        return null;
    }
});
exports.getRegistro = getRegistro;
const postRegistro = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const registro = yield registro_1.default.create({
        campo: body.campo,
        cultivo: body.cultivo,
        cantidad: body.cantidad,
        novedades: body.novedades,
        fecha_siembra: body.fecha_siembra,
        fecha_cosecha: body.fecha_cosecha,
    });
    yield registro.save();
});
exports.postRegistro = postRegistro;
const deleteRegistro = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const registro = yield registro_1.default.findByPk(id);
    if (registro) {
        yield registro.update({ activo: false });
    }
});
exports.deleteRegistro = deleteRegistro;
const searchRegistro = (campo) => __awaiter(void 0, void 0, void 0, function* () {
    const registro = yield registro_1.default.findOne({
        where: { campo: campo },
    });
    if (registro) {
        return true;
    }
    else {
        return false;
    }
});
exports.searchRegistro = searchRegistro;
//# sourceMappingURL=registros_dta.js.map