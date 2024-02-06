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
exports.getAreaCampo = exports.getAreaTotal = exports.getNombreCampo = exports.changeEstado = exports.getNumCamposByEstado = exports.getNumAllCamposByEstado = exports.countAllCampos = exports.countCampos = exports.deleteCampo = exports.putCampo = exports.postCampo = exports.getCampo = exports.getCamposActivos = exports.getAllCampos = exports.getCamposSembrados = exports.getAllCamposParaActividades = exports.getCamposParaActividades = exports.getCampos = void 0;
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
const getCamposParaActividades = (idencargado, campo) => __awaiter(void 0, void 0, void 0, function* () {
    const campos = yield campo_1.default.findAll({
        where: {
            id: { [sequelize_1.Op.ne]: campo },
            [sequelize_1.Op.and]: [
                { encargado: idencargado },
                { activo: true }
            ]
        }
    });
    return campos;
});
exports.getCamposParaActividades = getCamposParaActividades;
const getAllCamposParaActividades = (campo) => __awaiter(void 0, void 0, void 0, function* () {
    const campos = yield campo_1.default.findAll({
        where: {
            id: { [sequelize_1.Op.ne]: campo },
            activo: true
        }
    });
    return campos;
});
exports.getAllCamposParaActividades = getAllCamposParaActividades;
const getCamposSembrados = (idencargado, _estado) => __awaiter(void 0, void 0, void 0, function* () {
    const campos = yield campo_1.default.findAll({
        where: {
            [sequelize_1.Op.and]: [
                { encargado: idencargado },
                { estado: _estado }
            ]
        }
    });
    return campos;
});
exports.getCamposSembrados = getCamposSembrados;
const getAllCampos = () => __awaiter(void 0, void 0, void 0, function* () {
    const campos = yield campo_1.default.findAll();
    return campos;
});
exports.getAllCampos = getAllCampos;
const getCamposActivos = () => __awaiter(void 0, void 0, void 0, function* () {
    const campos = yield campo_1.default.findAll({
        where: { activo: true }
    });
    return campos;
});
exports.getCamposActivos = getCamposActivos;
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
const countCampos = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const nc = campo_1.default.count({
        where: { encargado: id }
    });
    return nc;
});
exports.countCampos = countCampos;
const countAllCampos = () => __awaiter(void 0, void 0, void 0, function* () {
    const nc = campo_1.default.count();
    return nc;
});
exports.countAllCampos = countAllCampos;
const getNumAllCamposByEstado = (estado) => __awaiter(void 0, void 0, void 0, function* () {
    const num = campo_1.default.findAll({
        where: {
            estado: estado,
        }
    });
    return (yield num).length;
});
exports.getNumAllCamposByEstado = getNumAllCamposByEstado;
const getNumCamposByEstado = (estado, id) => __awaiter(void 0, void 0, void 0, function* () {
    const num = campo_1.default.findAll({
        where: {
            estado: estado,
            encargado: id,
        }
    });
    return (yield num).length;
});
exports.getNumCamposByEstado = getNumCamposByEstado;
const changeEstado = (id, newestado) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoE = {
        estado: newestado,
    };
    const campo = yield campo_1.default.findByPk(id);
    if (campo) {
        yield campo.update(nuevoE);
    }
});
exports.changeEstado = changeEstado;
const getNombreCampo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const campo = yield campo_1.default.findByPk(id);
    if (campo) {
        return campo.dataValues.nombre;
    }
});
exports.getNombreCampo = getNombreCampo;
const getAreaTotal = () => __awaiter(void 0, void 0, void 0, function* () {
    const area = yield campo_1.default.findAll({
        attributes: [
            [sequelize_1.Sequelize.fn('SUM', sequelize_1.Sequelize.col('area')), 'total']
        ],
        where: {
            activo: true
        }
    });
    return area;
});
exports.getAreaTotal = getAreaTotal;
const getAreaCampo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const campo = yield campo_1.default.findByPk(id);
    if (campo) {
        return campo.dataValues.area;
    }
});
exports.getAreaCampo = getAreaCampo;
//# sourceMappingURL=campos_dta.js.map