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
exports.eliminarSiembra = exports.agregarSiembra = exports.buscarSiembra = exports.listarSiembras = void 0;
const siembras_dta_1 = require("../../data_access/siembras_dta");
const listarSiembras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const siembras = yield (0, siembras_dta_1.getSiembras)();
    res.json(siembras);
});
exports.listarSiembras = listarSiembras;
const buscarSiembra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const siembra = yield (0, siembras_dta_1.getSiembra)(id);
    if (siembra !== null) {
        res.json(siembra);
    }
    else {
        res.status(404).json({ message: 'No existe la siembra' });
    }
});
exports.buscarSiembra = buscarSiembra;
const agregarSiembra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    if (yield (0, siembras_dta_1.searchSiembra)(body.campo)) {
        res.status(404).json({ message: 'No se pueden agregar 2 siembras en el mismo campo' });
    }
    else {
        yield (0, siembras_dta_1.postSiembra)(req);
        res.status(200).json({ message: 'Siembra agregada correctamente' });
    }
});
exports.agregarSiembra = agregarSiembra;
const eliminarSiembra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const siembra = yield (0, siembras_dta_1.getSiembra)(id);
    if (siembra !== null) {
        yield (0, siembras_dta_1.deleteSiembra)(id);
        res.status(200).json({ message: 'Siembra eliminada correctamente' });
    }
    else {
        res.status(404).json({ message: 'No existe la siembra' });
    }
});
exports.eliminarSiembra = eliminarSiembra;
//# sourceMappingURL=siembras_controller.js.map