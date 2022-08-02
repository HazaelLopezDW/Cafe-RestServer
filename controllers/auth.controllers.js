const { response } = require("express");

const login = (req, res = response ) => {

    const { correo, password } = req.body;

    res.json({
        msg: 'Login Ok',
        correo,
        password
    });
}

module.exports = {
    login
}