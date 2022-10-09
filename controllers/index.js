const Auth = require('./auth.controllers');
const Buscar = require('./buscar.controllers');
const Categorias = require('./categorias.controllers');
const Productos = require('./productos.controllers');
const Uploads = require('./uploads.controllers');
const Usuarios = require('./usuarios.controllers');

module.exports = {
    ...Auth,
    ...Buscar,
    ...Categorias,
    ...Productos,
    ...Uploads,
    ...Usuarios
}