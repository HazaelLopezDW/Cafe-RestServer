const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Producto } = require('../models')

const coleccionesPermitidas= [
    'categorias',
    'productos',
    'usuarios',
    'roles'
];

const buscarUsuarios = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino); // True

    if(esMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        });
    }

    // Expresión regular
    const regex = new RegExp(termino, 'i')

    const usuarios = await Usuario.find({
        $or: [{nombre: regex}, {correo: regex}],
        $and: [{estado: true}]
    });

    const total = await Usuario.count({
        $or: [{nombre: regex}, {correo: regex}],
        $and: [{estado: true}]
    });

    res.json({
        total,
        results: usuarios
    });
}

const buscarCategorias = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino); // True

    if(esMongoID) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        });
    }

    // Expresión regular
    const regex = new RegExp(termino, 'i')

    const categoria = await Categoria.find({ nombre: regex, estado: true});

    const total = await Categoria.count({ nombre: regex, estado: true});
 
    res.json({
        total,
        results: categoria
    });
}

const buscarProductos = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino); // True

    if(esMongoID) {
        const producto = await (await Producto.findById(termino))
                                              .populate('categoria','nombre');
        return res.json({
            results: (producto) ? [producto] : []
        });
    }

    // Expresión regular
    const regex = new RegExp(termino, 'i')

    const producto = await Producto.find({ nombre: regex, estado: true})
                                   .populate('categoria','nombre');

    const total = await Producto.count({ nombre: regex, estado: true});
 
    res.json({
        total,
        results: producto
    });
}


const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
        res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        });
    }

    switch (coleccion) {
        case 'categorias':
            buscarCategorias(termino, res);
            break;

        case 'productos':
            buscarProductos(termino, res);
            break;

        case 'usuarios':
            buscarUsuarios(termino, res)
            break;

        default:
            return res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            })
    }
}

module.exports = {
    buscar
}