const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { Usuario } = require('../models')

const coleccionesPermitidas= [
    'categoria',
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
}


const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
        res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        });
    }

    switch (coleccion) {
        case 'categoria':
            
            break;

        case 'productos':

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