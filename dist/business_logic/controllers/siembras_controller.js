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
exports.dataUsoCampos = exports.showUsoCampos = exports.showProduccionPorCultivo = exports.eliminarSiembra = exports.agregarSiembra = exports.buscarSiembra = exports.listarSiembras = void 0;
const siembras_dta_1 = require("../../data_access/siembras_dta");
const campos_dta_1 = require("../../data_access/campos_dta");
const cultivos_dta_1 = require("../../data_access/cultivos_dta");
const date_controller_1 = require("../processes/date_controller");
const configuracion_dta_1 = require("../../data_access/configuracion_dta");
const usuarios_dta_1 = require("../../data_access/usuarios_dta");
const roles_dta_1 = require("../../data_access/roles_dta");
const listarSiembras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const siembras = yield (0, siembras_dta_1.getSiembras)();
    res.json(siembras);
});
exports.listarSiembras = listarSiembras;
const buscarSiembra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const siembra = yield (0, siembras_dta_1.getSiembraByCampo)(id);
    const cultivo = yield (0, cultivos_dta_1.getCultivo)(siembra === null || siembra === void 0 ? void 0 : siembra.dataValues.id_cultivo);
    if (siembra !== null) {
        const data = {
            id: siembra === null || siembra === void 0 ? void 0 : siembra.dataValues.id,
            cultivo: cultivo === null || cultivo === void 0 ? void 0 : cultivo.dataValues.nombre,
            fecha_siembra: siembra === null || siembra === void 0 ? void 0 : siembra.dataValues.fecha_siembra,
            produccion_estimada: siembra === null || siembra === void 0 ? void 0 : siembra.dataValues.produccion_estimada,
            fecha_cosecha_est: siembra === null || siembra === void 0 ? void 0 : siembra.dataValues.fecha_cosecha_est
        };
        res.json(data);
    }
    else {
        res.status(404).json({ message: 'No existe la siembra' });
    }
});
exports.buscarSiembra = buscarSiembra;
const agregarSiembra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    if (yield (0, siembras_dta_1.searchSiembra)(body.id_campo)) {
        res.status(404).json({ message: 'No se pueden agregar 2 siembras en el mismo campo' });
    }
    else {
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
        const conf = yield (0, configuracion_dta_1.getConfig)();
        yield (0, campos_dta_1.changeEstado)(body.id_campo, conf[0].dataValues.campo_sembrado);
        res.status(200).json({ message: 'Siembra agregada correctamente' });
    }
});
exports.agregarSiembra = agregarSiembra;
const eliminarSiembra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const siembra = yield (0, siembras_dta_1.getSiembra)(id);
    if (siembra !== null) {
        const conf = yield (0, configuracion_dta_1.getConfig)();
        yield (0, campos_dta_1.changeEstado)(siembra.dataValues.id_campo, conf[0].dataValues.campo_vacio);
        yield (0, siembras_dta_1.deleteSiembra)(id);
        res.redirect('/trazado');
    }
    else {
        res.status(404).json({ message: 'No existe la siembra' });
    }
});
exports.eliminarSiembra = eliminarSiembra;
function produccionEstimada(id_cult, id_camp) {
    return __awaiter(this, void 0, void 0, function* () {
        const cultivo = yield (0, cultivos_dta_1.getCultivo)(id_cult);
        const campo = yield (0, campos_dta_1.getCampo)(id_camp);
        return (cultivo === null || cultivo === void 0 ? void 0 : cultivo.dataValues.productividad) * (campo === null || campo === void 0 ? void 0 : campo.dataValues.area);
    });
}
const showProduccionPorCultivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        if ((usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario) != 1) {
            res.render('noauth');
        }
        else {
            const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
            const date = (0, date_controller_1.getDate)();
            const year = new Date().getFullYear();
            let produccion = [];
            let item = {
                "cultivo": '',
                "ene": 0,
                "feb": 0,
                "mar": 0,
                "abr": 0,
                "may": 0,
                "jun": 0,
                "jul": 0,
                "ago": 0,
                "sep": 0,
                "oct": 0,
                "nov": 0,
                "dic": 0,
            };
            const cultivos = yield (0, cultivos_dta_1.getCultivosActivos)();
            for (let i = 0; i < cultivos.length; i++) {
                let nomCultivo = yield (0, cultivos_dta_1.getNombreCultivo)(cultivos[i].dataValues.id);
                item = { "cultivo": '', "ene": 0, "feb": 0, "mar": 0, "abr": 0, "may": 0, "jun": 0, "jul": 0, "ago": 0, "sep": 0, "oct": 0, "nov": 0, "dic": 0, };
                item['cultivo'] = nomCultivo;
                for (let mes = 1; mes <= 12; mes++) {
                    const siembras = yield (0, siembras_dta_1.getProduccionPorCultivo)(cultivos[i].dataValues.id, year, mes);
                    if (siembras.length > 0) {
                        switch (mes) {
                            case 1:
                                item['ene'] = siembras[0].dataValues.total;
                                break;
                            case 2:
                                item['feb'] = siembras[0].dataValues.total;
                                break;
                            case 3:
                                item['mar'] = siembras[0].dataValues.total;
                                break;
                            case 4:
                                item['abr'] = siembras[0].dataValues.total;
                                break;
                            case 5:
                                item['may'] = siembras[0].dataValues.total;
                                break;
                            case 6:
                                item['jun'] = siembras[0].dataValues.total;
                                break;
                            case 7:
                                item['jul'] = siembras[0].dataValues.total;
                                break;
                            case 8:
                                item['ago'] = siembras[0].dataValues.total;
                                break;
                            case 9:
                                item['sep'] = siembras[0].dataValues.total;
                                break;
                            case 10:
                                item['oct'] = siembras[0].dataValues.total;
                                break;
                            case 11:
                                item['nov'] = siembras[0].dataValues.total;
                                break;
                            case 12:
                                item['dic'] = siembras[0].dataValues.total;
                                break;
                        }
                    }
                }
                produccion.push(item);
            }
            res.render('reports/crops_production', { produccion, usuario, rol, date });
        }
    }
    else {
        res.render('login', { error: '' });
    }
});
exports.showProduccionPorCultivo = showProduccionPorCultivo;
const showUsoCampos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        const usuario = yield (0, usuarios_dta_1.getUsuario)(req.session.user);
        if ((usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario) != 1) {
            res.render('noauth');
        }
        else {
            const rol = yield (0, roles_dta_1.getNombre)(usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.rol_usuario);
            const date = (0, date_controller_1.getDate)();
            const areaTotal = yield (0, campos_dta_1.getAreaTotal)();
            res.render('reports/fields_use', { usuario, rol, date, area: areaTotal[0].dataValues.total });
        }
    }
    else {
        res.render('login', { error: '' });
    }
});
exports.showUsoCampos = showUsoCampos;
const dataUsoCampos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const areaTotal = yield (0, campos_dta_1.getAreaTotal)();
    const date = (0, date_controller_1.getDate)();
    let data = [];
    let item = {
        "cultivo": '',
        "area": 0
    };
    let total = 0;
    const cultivos = yield (0, cultivos_dta_1.getCultivosActivos)();
    for (let i = 0; i < cultivos.length; i++) {
        let nomCultivo = yield (0, cultivos_dta_1.getNombreCultivo)(cultivos[i].dataValues.id);
        item = { "cultivo": '', "area": 0 };
        item['cultivo'] = nomCultivo;
        const camposSembrados = yield (0, siembras_dta_1.getCamposDeSiembras)(cultivos[i].dataValues.id, date);
        if (camposSembrados.length > 0) {
            for (let j = 0; j < camposSembrados.length; j++) {
                const area = yield (0, campos_dta_1.getAreaCampo)(camposSembrados[j].dataValues.id_campo);
                item['area'] += area;
                total += area;
            }
        }
        else {
            item['area'] += 0;
        }
        data.push(item);
    }
    item = { "cultivo": '', "area": 0 };
    item['cultivo'] = 'Sin uso';
    item['area'] = areaTotal[0].dataValues.total - total;
    data.push(item);
    res.json(data);
});
exports.dataUsoCampos = dataUsoCampos;
//# sourceMappingURL=siembras_controller.js.map