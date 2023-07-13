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
exports.deleteCampo = exports.putCampo = exports.postCampo = exports.getCampo = exports.getCampos = void 0;
const campo_1 = __importDefault(require("../models/campo"));
const sequelize_1 = require("sequelize");
const getCampos = (idencargado) => __awaiter(void 0, void 0, void 0, function* () {
    const campos = yield campo_1.default.findAll({
        where: {
            [sequelize_1.Op.and]: [
                { encargado: idencargado },
                { activo: true }
            ]
        }
    });
    return campos;
});
exports.getCampos = getCampos;
const getCampo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const campo = yield campo_1.default.findByPk(id);
    if (campo) {
        return campo;
    }
    else {
        return null;
    }
});
exports.getCampo = getCampo;
const postCampo = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const campo = yield campo_1.default.create({
        encargado: body.encargado,
        estado: body.estado,
        nombre: body.nombre,
        area: body.area,
        descripcion: body.descripcion,
        coordenadas: body.posiciones
    });
    yield campo.save();
});
exports.postCampo = postCampo;
const putCampo = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    const campo = yield campo_1.default.findByPk(id);
    if (campo) {
        yield campo.update(body);
    }
});
exports.putCampo = putCampo;
const deleteCampo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const campo = yield campo_1.default.findByPk(id);
    if (campo) {
        yield campo.update({ activo: false });
    }
});
exports.deleteCampo = deleteCampo;
//# sourceMappingURL=campos_dta.js.map