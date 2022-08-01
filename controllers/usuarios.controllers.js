const { response } = require("express");
const Usuario = require('../models/usuario');

const usuariosGet = (req, res = response) => {

    const { q, nombre = 'No Name', page = 1, limit = 10 } = req.query;

    res.json({
        msg: "Peticion Get - Controllers",
        q,
        nombre,
        page,
        limit
    });
};

const usuariosPost = async (req, res = response) => {

    const body = req.body;
    const usuario = new Usuario(body);

    await usuario.save();

    res.json({
        usuario
    });
};

const usuariosPut = (req, res) => {

    const { id } = req.params;

    res.json({
        msg: "Peticion Put - Controllers",
        id
    });
};

const usuariosDelete = (req, res) => {

    const { id } = req.params;

    res.json({
        msg: "Peticion Delete - Controllers",
        id
    });
};

const usuariosPatch = (req, res) => {
  res.json({
    msg: "Peticion Patch - Controllers",
  });
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}
