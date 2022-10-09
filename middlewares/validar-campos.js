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

    let { email, password } = req.body

    // Limpieza nuestros campos
    email = email.trim();        // Creo que deberia pasar por el toLowerCase()
    password = password.trim(); // Creo que deberia pasar por el toLowerCase()

    if(email === password) {
        return res.status(400).json({
            ok: false,
            msg: `Tu contraseña no puede ser tu correo`
        });
    }

    if(password === 'password' || password === 'contraseña' || password === '123456'){
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