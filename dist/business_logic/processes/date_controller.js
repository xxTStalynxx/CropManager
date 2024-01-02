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
exports.fechaEstimada = exports.getDate = void 0;
const moment_1 = __importDefault(require("moment"));
const cultivos_dta_1 = require("../../data_access/cultivos_dta");
const getDate = () => {
    const timeElapsed = Date.now();
    const date = new Date(timeElapsed);
    const formatDate = ((0, moment_1.default)(date)).format('YYYY-MM-DD');
    return formatDate;
};
exports.getDate = getDate;
const fechaEstimada = (fecha, id_cult) => __awaiter(void 0, void 0, void 0, function* () {
    const cultivo = yield (0, cultivos_dta_1.getCultivo)(id_cult);
    const fech = Date.parse(fecha) + (cultivo === null || cultivo === void 0 ? void 0 : cultivo.dataValues.crecimiento) * 3600000 * 24 + 3600000 * 12;
    const date = new Date(fech);
    const formatDate = ((0, moment_1.default)(date)).format('YYYY-MM-DD');
    return formatDate;
});
exports.fechaEstimada = fechaEstimada;
//# sourceMappingURL=date_controller.js.map