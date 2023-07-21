"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmailTemplate = void 0;
const getEmailTemplate = (token, usuario, id) => {
    const url = 'http://localhost:8000/showRestaurar';
    return `
    <form>
      <div>
        <label>Hola ${usuario}</label>
        <p>Para restaurar su contraseña haga clic en el siguiente enlace:</p>
        <br>
        <a href="${url}/${token}/${id}" target="_blank">Restaurar contraseña</a>
        <p>Si no ha realizado esta petición para restaurar su contraseña ignore este correo o cambie su contraseña si cree que se trata de un ataque.</p>
      </div>
    </form>
    `;
};
exports.getEmailTemplate = getEmailTemplate;
//# sourceMappingURL=template.js.map