"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showForgot = exports.showMain = void 0;
const showMain = (req, res) => {
    res.render('main');
};
exports.showMain = showMain;
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