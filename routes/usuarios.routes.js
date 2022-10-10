const { Router } = require('express');
const { check } = require('express-validator');
const {
        validarCampos, 
        validarJWT, 
        tieneRole,
        validarPasswordCorreo} = require('../middlewares');
const { 
        esRolValido, 
        emailExiste, 
        existeUsuarioPorId } = require('../helpers/db-validators');
const { 
        usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosDelete, 
        usuariosPatch } = require('../controllers');
        
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
          validarCampos,
          validarPasswordCorreo
        ],
        usuariosPost
);

router.put('/:id', 
        [
          check('id', 'No es un ID válido').isMongoId(),
          check('id').custom(existeUsuarioPorId),
          check('rol').custom(esRolValido),
          validarCampos
        ],
        usuariosPut
);

router.delete('/:id',
        [
          validarJWT,
          // esAdminRole,
          tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
          check('id', 'No es un ID válido').isMongoId(),
          check('id').custom(existeUsuarioPorId),
          validarCampos
        ],
        usuariosDelete
);

router.patch('/', usuariosPatch);

module.exports = router