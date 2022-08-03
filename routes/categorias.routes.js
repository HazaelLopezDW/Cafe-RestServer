const { response } = require('express');
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Obtener todas la categorias - Servicio público
router.get('/', (req, res = response) => {
    res.status(200).json({
        msg: 'Categorias get'
    });
});

// Obtener Categoria por Id -Servicio público
router.get('/:id', (req, res = response) => {
    res.status(200).json({
        msg: 'Categorias get id'
    });
});

// Crear una categoria - Servicio privado jwt
router.post('/', (req, res = response) => {
    res.status(200).json({
        msg: 'Categorias post '
    });
});

// Actualizar un registro por Id -Servicio Privado jwt
router.put('/:id', (req, res = response) => {
    res.status(200).json({
        msg: 'Categorias put id'
    });
});

// Borrar una categoria - Servicio privado 
router.delete('/:id', (req, res = response) => {
    res.status(200).json({
        msg: 'Categorias delete id'
    });
});

module.exports = router;