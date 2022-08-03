const { response } = require('express');
const { Categoria } = require('../models');

(req, res = response) => {
    res.status(200).json({
        msg: 'Categorias get'
    });
}

(req, res = response) => {
    res.status(200).json({
        msg: 'Categorias get id'
    });
}

const crearCategoria = async (req, res = response) => {

    const nombre  = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre });

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        });
    }

    // Generar la Data a Guardar
    const data  = {
        nombre,
        usuario: req.usuario._id
    }
    
    const categoria = await Categoria(data);
    // Guardar DB
    await categoria.save();

    res.status(201).json(categoria);
}

(req, res = response) => {
    res.status(200).json({
        msg: 'Categorias put id'
    });
}

(req, res = response) => {
    res.status(200).json({
        msg: 'Categorias delete id'
    });
}

module.exports = {
    crearCategoria
}