const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen } = require('../controllers/uploads.controllers');
const { coleccionesPermitidas } = require('../helpers');

const { validarArchivoSubir, validarCampos } = require('../middlewares');

const router = Router();

router.post('/', [validarArchivoSubir], cargarArchivo);

router.put(
    '/:coleccion/:id',
    [
      validarArchivoSubir,
      check('id','El Id debe ser un mongoId').isMongoId(),
      check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios','productos'])),
      validarCampos
    ],
    actualizarImagen
);


module.exports = router;