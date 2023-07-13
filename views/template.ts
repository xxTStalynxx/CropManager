export const getEmailTemplate = (token: string, usuario: string, id: string) => {
    const url = 'http://localhost:8000/showRestaurar';
    return `
    <form>
      <div>
        <label>Hola ${usuario}</label>
        <p>Para restaurar su contraseña haga clic en el siguiente enlace:</p>
        <br>
        <a href="${url}/${token}/${id}" target="_blank">Restaurar contraseña</a>
      </div>
    </form>
    `;
}