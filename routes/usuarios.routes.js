const { Router } = require('express');
const { check } = require('express-validator');
const { esRolValido, emailExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { 
        usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosDelete, 
        usuariosPatch } = require('../controllers/usuarios.controllers');


const router = Router();

router.get('/', usuariosGet);

router.post('/', 
        [
          check('nombre','El nombre es obligatorio').not().isEmpty(),
          check('password','El password debe tener de 6 a más caracteres').isLength({ min: 6 }),
          check('correo','El correo no es valido').isEmail(),
          check('correo').custom(emailExiste),
        //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
          check('rol').custom(esRolValido),
          validarCampos
        ],
        usuariosPost
);

router.put('/:id', usuariosPut);

router.delete('/:id', usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router