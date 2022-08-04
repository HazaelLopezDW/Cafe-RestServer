const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT, tieneRole } = require('../middlewares');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const { 
        actualizarCategoria, 
        borrarCategoria,
        crearCategoria, 
        obtenerCategoria,  
        obtenerCategorias } = require('../controllers/categorias.controllers');

const router = Router();

// Obtener todas la categorias - Servicio público
router.get('/', obtenerCategorias);

// Obtener Categoria por Id -Servicio público
router.get(
    '/:id',
    [
      check('id','No es un ID de mongo').isMongoId(),
      check('id').custom(existeCategoriaPorId),
      validarCampos
    ],
    obtenerCategoria
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
router.put(
    '/:id', 
    [
      validarJWT,
      tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
      check('nombre','El nombre es obligatorio').not().isEmpty(),
      check('id','No es un ID de mongo').isMongoId(),
      check('id').custom(existeCategoriaPorId),
      validarCampos
    ],
    actualizarCategoria);

// Borrar una categoria - Servicio privado 
router.delete(
    '/:id', 
    [
      validarJWT,
      tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
      check('id','No es un ID de mongo').isMongoId(),
      check('id').custom(existeCategoriaPorId),
      validarCampos
    ],
    borrarCategoria
);

module.exports = router;