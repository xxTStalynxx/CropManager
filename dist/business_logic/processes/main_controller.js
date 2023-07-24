"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showForgot = exports.showCropManager = exports.showNosotros = exports.showMain = void 0;
const showMain = (req, res) => {
    res.render('main');
};
exports.showMain = showMain;
const showNosotros = (req, res) => {
    res.render('nosotros');
};
exports.showNosotros = showNosotros;
const showCropManager = (req, res) => {
    res.render('cropmanager');
};
exports.showCropManager = showCropManager;
const showForgot = (req, res) => {
    if (req.session.user) {
        res.redirect('/inicio');
    }
    else {
        res.render('forgot', { error: '' });
    }
};
exports.showForgot = showForgot;
//# sourceMappingURL=main_controller.js.map