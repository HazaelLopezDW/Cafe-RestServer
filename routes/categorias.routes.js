const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('../middlewares');

const { crearCategoria } = require('../controllers/categorias.controllers');

const router = Router();

// Obtener todas la categorias - Servicio público
router.get('/', );

// Obtener Categoria por Id -Servicio público
router.get(
    '/:id',
    [
     check('id').custom(existeCategoria),
     validarCampos
    ],
);

// Crear una categoria - Servicio privado jwt
router.post(
    '/', 
    [
      validarJWT,
      check('nombre','El nombre es oblicatorio').not().isEmpty(),
      validarCampos
    ], 
    crearCategoria
);

// Actualizar un registro por Id -Servicio Privado jwt
router.put('/:id', );

// Borrar una categoria - Servicio privado 
router.delete('/:id', );

module.exports = router;