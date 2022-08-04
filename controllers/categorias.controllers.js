const { response } = require('express');
const { Categoria } = require('../models');

// ObtenerCategorias - paginado - Total - Populate
const obtenerCategorias = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query).skip(Number(desde)).limit(Number(limite)).populate('nombre')
    ]);

    res.status(200).json({total, categorias});
}

const obtenerCategoria = async (req, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findById(id);

    res.status(200).json(categoria);
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

const actualizarCategoria = async (req, res = response) => {

    const { id } = req.params;
    let nombre  = req.body?.nombre;

    if(!nombre){
        return res.status(500).json({
            msg: `Error nombre undefined`
        });
    }
    
    nombre = nombre.toUpperCase();
    const categoria  = await Categoria.findByIdAndUpdate(id, {nombre});

    res.status(200).json(categoria);
}

const borrarCategoria = async (req, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false}, {rawResult: true});

    res.status(200).json(categoria);
}

module.exports = {
    actualizarCategoria,
    borrarCategoria,
    crearCategoria,
    obtenerCategoria,
    obtenerCategorias

}