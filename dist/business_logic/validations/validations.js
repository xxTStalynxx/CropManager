"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarPassword = exports.validarEmail = void 0;
const validarEmail = (correo) => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return regex.test(correo);
};
exports.validarEmail = validarEmail;
const validarPassword = (contrasena) => {
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regexPassword.test(contrasena);
};
exports.validarPassword = validarPassword;
//# sourceMappingURL=validations.js.map