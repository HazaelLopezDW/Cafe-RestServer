const { response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(Number(desde)) .limit(Number(limite))
    ]);

    res.json({ total, usuarios });
};

const usuariosPost = async (req, res = response) => {

    const {nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(11);
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en la DB
    await usuario.save();

    res.json({
        usuario
    });
};

const usuariosPut = async (req, res) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO: validar contra DB
    if(password){
         // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(11);
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
};

const usuariosDelete = async (req, res) => {

    const { id } = req.params;
    
    // Borramos fisicamente
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json(usuario);
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
