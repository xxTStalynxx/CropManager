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
exports.deleteSalida = exports.postSalida = exports.getSalida = exports.getSalidas = void 0;
const salida_1 = __importDefault(require("../models/salida"));
const getSalidas = () => __awaiter(void 0, void 0, void 0, function* () {
    const salidas = yield salida_1.default.findAll();
    return salidas;
});
exports.getSalidas = getSalidas;
const getSalida = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const salida = yield salida_1.default.findByPk(id);
    if (salida) {
        return salida;
    }
    else {
        return null;
    }
});
exports.getSalida = getSalida;
const postSalida = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const salida = yield salida_1.default.create({
        descripcion: body.descripcion,
        novedades: body.novedades,
    });
    yield salida.save();
});
exports.postSalida = postSalida;
const deleteSalida = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const salida = yield salida_1.default.findByPk(id);
    if (salida) {
        yield salida.update({ activo: false });
    }
});
exports.deleteSalida = deleteSalida;
//# sourceMappingURL=salidas_dta.js.map