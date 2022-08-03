const { response } = require('express');
const { Categoria } = require('../models');

// ObtenerCategorias - paginado - Total - Populate
const obtenerCategorias = (req, res = response) => {
    res.status(200).json({
        msg: 'Categorias get'
    });
}

const obtenerCategoria = (req, res = response) => {
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

const actualizarCategoria = (req, res = response) => {
    res.status(200).json({
        msg: 'Categorias put id'
    });
}

const borrarCategoria = (req, res = response) => {
    res.status(200).json({
        msg: 'Categorias delete id'
    });
}

module.exports = {
    actualizarCategoria,
    borrarCategoria,
    crearCategoria,
    obtenerCategoria,
    obtenerCategorias

}