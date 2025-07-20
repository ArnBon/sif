const { Router } = require('express');
const { crearTelefono, vincularTelefonoPersona } = require('../controllers/telefono.controller');


const router = Router();
router.post('/', crearTelefono);
router.post('/personas/:personaId', vincularTelefonoPersona); // POST /api/telefonos/personas/:personaId

module.exports = router;