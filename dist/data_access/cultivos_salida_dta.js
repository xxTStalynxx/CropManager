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
exports.postCultivo_salida = exports.getCultivo_salida = exports.getCultivo_salidas = void 0;
const cultivo_salida_1 = __importDefault(require("../models/cultivo_salida"));
const getCultivo_salidas = () => __awaiter(void 0, void 0, void 0, function* () {
    const cultivo_salidas = yield cultivo_salida_1.default.findAll();
    return cultivo_salidas;
});
exports.getCultivo_salidas = getCultivo_salidas;
const getCultivo_salida = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cultivo_salidas = yield cultivo_salida_1.default.findOne({
        where: { id: id },
    });
    if (cultivo_salidas) {
        return cultivo_salidas;
    }
    else {
        return null;
    }
});
exports.getCultivo_salida = getCultivo_salida;
const postCultivo_salida = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const cultivo_salida = yield cultivo_salida_1.default.create({
        id: body.id,
        id_cultivo: body.id_cultivo,
        cantidad: body.cantidad,
    });
    yield cultivo_salida.save();
});
exports.postCultivo_salida = postCultivo_salida;
//# sourceMappingURL=cultivos_salida_dta.js.map