const { Router } = require('express');
const { getPermisos, getPermisoById, crearPermiso, editarPermiso, borrarPermiso } = require('../controllers/permisos.controllers');
const { check } = require('express-validator');
const { validarPermiso } = require('../middlewares/validarcamposduplicados');
const { validarCamposVacios } = require('../middlewares/validarcamposvacios');
const { validarJWT } = require('../middlewares/validarjwt');


const router = Router();

router.get('/', getPermisos);
router.get('/:id', getPermisoById);


router.post('/', 
    [
      check('nombre_permiso', 'El campo Nombre de Permiso es obligatorio').not().isEmpty(), 
      check('descripcion', 'El campo Descripcion es obligatorio').not().isEmpty(),
      validarPermiso,      
      validarCamposVacios, 
    ],
    crearPermiso);



router.put('/:id',
    [
        validarJWT,
        check('nombre_permiso', 'El campo Nombre de Permiso es obligatorio').not().isEmpty(), 
        check('descripcion', 'El campo Descripcion es obligatorio').not().isEmpty(),
        validarCamposVacios,
    ],
    editarPermiso);


router.delete('/:id', validarJWT, borrarPermiso);



module.exports = router;