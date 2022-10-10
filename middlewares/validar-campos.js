const { response } = require("express");
const { validationResult } = require("express-validator");

const validarCampos = (req, res = response, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    next();
}

const validarPasswordCorreo = (req, res = response, next) => {

    let { correo, password } = req.body;

    // Limpieza nuestros campos
    correo = correo.trim();        // Creo que deberia pasar por el toLowerCase()
    password = password.trim(); // Creo que deberia pasar por el toLowerCase()

    if(correo === password) {
        return res.status(400).json({
            ok: false,
            msg: `Tu contraseña no puede ser tu correo`
        });
    }

    if(password === 'password' || password === 'contraseña' || 
       password === '123456' || password === 'correo'){
        return res.status(400).json({
            ok: false,
            msg: `Evita usar "correo, password, o 1-6" como tu password`
        });
    }

    next();
}

module.exports = {
    validarCampos,
    validarPasswordCorreo
}