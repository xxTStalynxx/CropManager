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
exports.doPrediccion = void 0;
const campos_dta_1 = require("../../data_access/campos_dta");
const cultivos_dta_1 = require("../../data_access/cultivos_dta");
const doPrediccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_camp, id_cult } = req.params;
    const campo = yield (0, campos_dta_1.getCampo)(id_camp);
    const cultivo = yield (0, cultivos_dta_1.getCultivo)(id_cult);
    const prod_est = (campo === null || campo === void 0 ? void 0 : campo.dataValues.area) * (cultivo === null || cultivo === void 0 ? void 0 : cultivo.dataValues.productividad);
    const data = {
        cultivo: cultivo === null || cultivo === void 0 ? void 0 : cultivo.dataValues.nombre,
        produccion_estimada: prod_est,
        ganancia_estimada: (prod_est * (cultivo === null || cultivo === void 0 ? void 0 : cultivo.dataValues.precio)).toFixed(2)
    };
    res.json(data);
});
exports.doPrediccion = doPrediccion;
//# sourceMappingURL=prediccion_controller.js.map