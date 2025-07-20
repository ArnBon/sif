const { Router } = require('express');
const { crearDireccion, vincularDireccionPersona } = require('../controllers/direccion.controller');


const router = Router();
router.post('/', crearDireccion);
router.put('/:id', vincularDireccionPersona);
module.exports = router;