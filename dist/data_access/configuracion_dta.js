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
exports.putConfig = exports.postConfig = exports.getConfig = void 0;
const config_1 = __importDefault(require("../models/config"));
const getConfig = () => __awaiter(void 0, void 0, void 0, function* () {
    const config = yield config_1.default.findAll();
    return config;
});
exports.getConfig = getConfig;
const postConfig = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const config = yield config_1.default.create({
        area_minima: body.area_minima,
        campo_vacio: body.campo_vacio,
        campo_sembrado: body.campo_sembrado
    });
    yield config.save();
});
exports.postConfig = postConfig;
const putConfig = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const config = yield config_1.default.findByPk(1);
    if (config) {
        yield config.update(body);
    }
});
exports.putConfig = putConfig;
//# sourceMappingURL=configuracion_dta.js.map