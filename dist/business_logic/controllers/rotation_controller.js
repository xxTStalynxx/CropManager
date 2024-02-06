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
exports.agregarRotacionDeSiembra = exports.mostrarSiembra = exports.mostrarCultivosRecomendados = exports.mostrarCamposSembrados = exports.mostrarRotacion = void 0;
const date_controller_1 = require("../processes/date_controller");
const usuarios_dta_1 = require("../../data_access/usuarios_dta");
const roles_dta_1 = require("../../data_access/roles_dta");
const cultivos_dta_1 = require("../../data_access/cultivos_dta");
const campos_dta_1 = require("../../data_access/campos_dta");
const configuracion_dta_1 = require("../../data_access/configuracion_dta");
const estados_dta_1 = require("../../data_access/estados_dta");
const familias_dta_1 = require("../../data_access/familias.dta");
const siembras_dta_1 = require("../../data_access/siembras_dta");
const mostrarRotacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        const date = (0, date_controller_1.getDate)();
        const cultivos = yield (0, cultivos_dta_1.getCultivosActivos)();
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
        const estadoSembrado = yield (0, configuracion_dta_1.getConfig)();
        const campos = yield (0, campos_dta_1.getCamposSembrados)(req.session.user, estadoSembrado[0].dataValues.campo_sembrado);
        res.render('rotation', { date, usuario, rol, cultivos, campos, error: '' });
    }
    else {
        res.render('login', { error: '' });
    }
});
exports.mostrarRotacion = mostrarRotacion;
const mostrarCamposSembrados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const estadoSembrado = yield (0, configuracion_dta_1.getConfig)();
    let campos = yield (0, campos_dta_1.getCamposSembrados)(req.session.user, estadoSembrado[0].dataValues.campo_sembrado);
    for (const element of campos) {
        const estado = yield (0, estados_dta_1.getEstado)(element.dataValues.estado);
        element.dataValues.color = estado === null || estado === void 0 ? void 0 : estado.dataValues.color;
    }
    res.json(campos);
});
exports.mostrarCamposSembrados = mostrarCamposSembrados;
const mostrarCultivosRecomendados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { campo } = req.params;
    const siembras = yield (0, siembras_dta_1.getSiembrasPorCampo)(campo);
    const cultivo = yield (0, cultivos_dta_1.getCultivo)(siembras[siembras.length - 1].dataValues.id_cultivo);
    console.log(cultivo);
    const familia = yield (0, familias_dta_1.getFamilia)(cultivo === null || cultivo === void 0 ? void 0 : cultivo.dataValues.familia);
    let cultivos = [];
    if ((familia === null || familia === void 0 ? void 0 : familia.dataValues.exigencia_organica) != 1) {
        let exigencia = familia === null || familia === void 0 ? void 0 : familia.dataValues.exigencia_organica;
        do {
            const familias = yield (0, familias_dta_1.getFamiliasPorExigencia)(exigencia - 1);
            for (let i = 0; i < familias.length; i++) {
                const _cultivos = yield (0, cultivos_dta_1.getCultivosRecomendados)(cultivo === null || cultivo === void 0 ? void 0 : cultivo.dataValues.id, familias[i].dataValues.id);
                for (let j = 0; j < _cultivos.length; j++) {
                    _cultivos[j].dataValues.recomendado = 1;
                    cultivos = cultivos.concat(_cultivos[j]);
                }
            }
            exigencia--;
        } while (exigencia > 1 && cultivos.length < 1);
        if (cultivos.length < 1) {
            const _cultivos = yield (0, cultivos_dta_1.getCultivosActivos)();
            for (let i = 0; i < cultivos.length; i++) {
                _cultivos[i].dataValues.recomendado = 2;
                cultivos = cultivos.concat(_cultivos[i]);
            }
        }
        else if (exigencia > 1) {
            const _familias = yield (0, familias_dta_1.getFamiliasMenorExigencia)(exigencia - 1);
            for (let i = 0; i < _familias.length; i++) {
                const _cultivos = yield (0, cultivos_dta_1.getCultivosRecomendados)(cultivo === null || cultivo === void 0 ? void 0 : cultivo.dataValues.id, _familias[i].dataValues.id);
                for (let j = 0; j < _cultivos.length; j++) {
                    _cultivos[j].dataValues.recomendado = 0;
                    cultivos = cultivos.concat(_cultivos[j]);
                }
            }
        }
    }
    else {
        const _cultivos = yield (0, cultivos_dta_1.getCultivosActivos)();
        for (let i = 0; i < cultivos.length; i++) {
            _cultivos[i].dataValues.recomendado = 2;
            cultivos = cultivos.concat(_cultivos[i]);
        }
    }
    res.json(cultivos);
});
exports.mostrarCultivosRecomendados = mostrarCultivosRecomendados;
const mostrarSiembra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { campo } = req.params;
    const siembras = yield (0, siembras_dta_1.getSiembrasPorCampo)(campo);
    res.json(siembras);
});
exports.mostrarSiembra = mostrarSiembra;
const agregarRotacionDeSiembra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const prod_est = yield produccionEstimada(body.id_cultivo, body.id_campo);
    const fecha_est = yield (0, date_controller_1.fechaEstimada)(body.fecha_siembra, body.id_cultivo);
    let newSimbra = {
        id_campo: body.id_campo,
        id_cultivo: body.id_cultivo,
        fecha_siembra: body.fecha_siembra,
        produccion_estimada: prod_est,
        fecha_cosecha_est: fecha_est
    };
    yield (0, siembras_dta_1.postSiembra)(newSimbra);
    res.redirect('/rotacion');
});
exports.agregarRotacionDeSiembra = agregarRotacionDeSiembra;
function produccionEstimada(id_cult, id_camp) {
    return __awaiter(this, void 0, void 0, function* () {
        const cultivo = yield (0, cultivos_dta_1.getCultivo)(id_cult);
        const campo = yield (0, campos_dta_1.getCampo)(id_camp);
        return (cultivo === null || cultivo === void 0 ? void 0 : cultivo.dataValues.productividad) * (campo === null || campo === void 0 ? void 0 : campo.dataValues.area);
    });
}
//# sourceMappingURL=rotation_controller.js.map