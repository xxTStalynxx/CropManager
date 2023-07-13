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
exports.eliminarSalida = exports.agregarSalida = exports.buscarSalida = exports.listarSalidas = void 0;
const salidas_dta_1 = require("../../data_access/salidas_dta");
const listarSalidas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const salidas = yield (0, salidas_dta_1.getSalidas)();
    res.render('departures', { salidas });
});
exports.listarSalidas = listarSalidas;
const buscarSalida = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const salida = yield (0, salidas_dta_1.getSalida)(id);
    if (salida !== null) {
        res.json(salida);
    }
    else {
        res.status(404).json({ message: 'No existe la salida' });
    }
});
exports.buscarSalida = buscarSalida;
const agregarSalida = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, salidas_dta_1.postSalida)(req);
    res.status(200).json({ message: 'Salida agregada correctamente' });
});
exports.agregarSalida = agregarSalida;
const eliminarSalida = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const salida = yield (0, salidas_dta_1.getSalida)(id);
    if (salida !== null) {
        yield (0, salidas_dta_1.deleteSalida)(id);
        res.status(200).json({ message: 'Salida eliminada correctamente' });
    }
    else {
        res.status(404).json({ message: 'No existe la salida' });
    }
});
exports.eliminarSalida = eliminarSalida;
//# sourceMappingURL=salidas_controller.js.map