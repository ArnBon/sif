const { Router } = require('express');
const { check } = require('express-validator');
const { getRoles, getRolById, crearRol, editarRol, borrarRol } = require('../controllers/roles.controllers');
const { validarPermiso } = require('../middlewares/validarcamposduplicados');
const { validarCamposVacios } = require('../middlewares/validarcamposvacios');
const { validarJWT } = require('../middlewares/validarjwt');


const router = Router();

router.get('/', getRoles );
router.get('/:id', getRolById);


router.post('/',
    [
      check('nombre_rol', 'El campo Nombre de Usuario es obligatorio').not().isEmpty(), 
      check('descripcion', 'El campo Descripción es obligatorio').not().isEmpty(),
      validarPermiso,      
      validarCamposVacios,
    ],
    crearRol);


router.put('/:id',
    [
      validarJWT,
      check('nombre_rol', 'El campo Nombre de Usuario es obligatorio').not().isEmpty(), 
      check('descripcion', 'El campo Descripción es obligatorio').not().isEmpty(),
      validarCamposVacios,
    ],    
    editarRol);


router.delete('/:id', validarJWT, borrarRol);


module.exports = router;