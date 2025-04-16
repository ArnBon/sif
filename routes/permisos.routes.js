const { Router } = require('express');
const { getPermisos, getPermisoById, crearPermiso, editarPermiso, borrarPermiso } = require('../controllers/permisos.controllers');



const router = Router();

router.get('/', getPermisos);
router.get('/:id', getPermisoById);
router.post('/', crearPermiso);
router.put('/:id', editarPermiso);
router.delete('/:id', borrarPermiso);



module.exports = router;