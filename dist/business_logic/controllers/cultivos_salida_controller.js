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
exports.agregarCultivo_salida = exports.buscarCultivo_salida = exports.listarCultivo_salidas = void 0;
const cultivos_salida_dta_1 = require("../../data_access/cultivos_salida_dta");
const listarCultivo_salidas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cultivo_salidas = yield (0, cultivos_salida_dta_1.getCultivo_salidas)();
    res.json(cultivo_salidas);
});
exports.listarCultivo_salidas = listarCultivo_salidas;
const buscarCultivo_salida = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cultivo_salida = yield (0, cultivos_salida_dta_1.getCultivo_salida)(id);
    if (cultivo_salida !== null) {
        res.json(cultivo_salida);
    }
    else {
        res.status(404).json({ message: 'No existe el registro de cultivos de la salida' });
    }
});
exports.buscarCultivo_salida = buscarCultivo_salida;
const agregarCultivo_salida = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    if (body.cantidad > 0) {
        yield (0, cultivos_salida_dta_1.postCultivo_salida)(req);
        res.status(200).json({ message: 'Registro de cultivos a la salida realizado correctamente' });
    }
    else {
        res.status(404).json({ message: 'La cantidad debe ser positiva' });
    }
});
exports.agregarCultivo_salida = agregarCultivo_salida;
//# sourceMappingURL=cultivos_salida_controller.js.map