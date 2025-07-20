const { Router } = require('express');
const { crearTelefono, vincularTelefonoPersona } = require('../controllers/direccion.controller');


const router = Router();
router.post('/', crearTelefono);
router.put('/:id', vincularTelefonoPersona);
module.exports = router;