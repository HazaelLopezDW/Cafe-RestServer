const { response } = require("express");

const usuariosGet = (req, res = response) => {
  res.json({
    msg: "Peticion Get - Controllers",
  });
};

const usuariosPost = (req, res) => {

    const {nombre, edad} = req.body;

    res.json({
        msg: "Peticion Post - Controllers",
        nombre,
        edad
    });
};

const usuariosPut = (req, res) => {
  res.json({
    msg: "Peticion Put - Controllers",
  });
};

const usuariosDelete = (req, res) => {
  res.json({
    msg: "Peticion Delete - Controllers",
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
