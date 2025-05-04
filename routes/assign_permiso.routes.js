/**Ruta: /api/assignPermiso */
const { Router } = require('express');
const { asignarPermisoRol } = require('../controllers/assign_permiso.controllers');

const router = Router();

//asignar permiso al rol
router.post('/', asignarPermisoRol);

module.exports = router;