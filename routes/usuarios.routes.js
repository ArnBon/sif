const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, getUsuarioById, getUsuarioRolPermisos, crearUsuario, editarUsuario, borrarUsuario } = require('../controllers/usuarios.controllers');
const { validarUsuario, validarEmailDuplicado } = require('../middlewares/validarcamposduplicados');
const { validarCamposVacios } = require('../middlewares/validarcamposvacios');
const { validarJWT } = require('../middlewares/validarjwt');


const router = Router();


router.get('/', validarJWT, getUsuarios );
router.get('/:id', getUsuarioById);
router.get('/usuariorolpermiso/:id/', getUsuarioRolPermisos);


router.post('/', 
    [
        check('nombre_usuario', 'El campo Nombre de Usuario es obligatorio').not().isEmpty(), 
        check('contrasena', 'El campo Contraseña es obligatorio').not().isEmpty(), 
        check('email', 'El campo Email es obligatorio').not().isEmpty(),        
        check('estatus', 'El campo estatus es obligatorio').not().isEmpty(),
        validarUsuario, 
        validarEmailDuplicado,      
        validarCamposVacios, 
    ],    
    crearUsuario);



router.put('/:id',
    [
        validarJWT,
        check('nombre_usuario', 'El campo Nombre de Usuario es obligatorio').not().isEmpty(), 
        check('contrasena', 'El campo Contraseña es obligatorio').not().isEmpty(), 
        check('email', 'El campo Email es obligatorio').not().isEmpty(),          
        check('estatus', 'El campo estatus es obligatorio').not().isEmpty(),
        validarUsuario,
        validarCamposVacios,
    ],    
    editarUsuario);



router.delete('/:id', validarJWT, borrarUsuario);



module.exports = router;