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
exports.searchEstado = exports.restoreEstado = exports.deleteEstado = exports.putEstado = exports.postEstado = exports.getEstado = exports.getEstados = void 0;
const estado_1 = __importDefault(require("../models/estado"));
const getEstados = () => __awaiter(void 0, void 0, void 0, function* () {
    const estados = yield estado_1.default.findAll();
    return estados;
});
exports.getEstados = getEstados;
const getEstado = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const estado = yield estado_1.default.findByPk(id);
    if (estado) {
        return estado;
    }
    else {
        return null;
    }
});
exports.getEstado = getEstado;
const postEstado = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const estado = yield estado_1.default.create({
        nombre: body.nombre,
        descripcion: body.descripcion,
    });
    yield estado.save();
});
exports.postEstado = postEstado;
const putEstado = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const estado = yield estado_1.default.findByPk(id);
    if (estado) {
        yield estado.update(body);
    }
});
exports.putEstado = putEstado;
const deleteEstado = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const estado = yield estado_1.default.findByPk(id);
    if (estado) {
        yield estado.update({ activo: false });
    }
});
exports.deleteEstado = deleteEstado;
const restoreEstado = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const estado = yield estado_1.default.findByPk(id);
    if (estado) {
        yield estado.update({ activo: true });
    }
});
exports.restoreEstado = restoreEstado;
const searchEstado = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    const estado = yield estado_1.default.findOne({
        where: { nombre: nombre },
    });
    if (estado) {
        return true;
    }
    else {
        return false;
    }
});
exports.searchEstado = searchEstado;
//# sourceMappingURL=estados_dta.js.map