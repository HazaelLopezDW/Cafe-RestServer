const { response } = require("express");

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

const usuariosPost = (req, res = response) => {

    const {nombre, edad} = req.body;

    res.json({
        msg: "Peticion Post - Controllers",
        nombre,
        edad
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
