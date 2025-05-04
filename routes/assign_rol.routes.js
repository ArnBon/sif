/**Ruta: /api/assignRol */
const { Router } = require('express');
const { asignarRolUsuario } = require('../controllers/assign_rol.controllers');

const router = Router();
//asignar rol al usuario
router.post('/', asignarRolUsuario);


module.exports = router;

