const { Router } = require('express');
const { crearDireccion, vincularDireccionPersona } = require('../controllers/direccion.controller');


const router = Router();
router.post('/', crearDireccion);
router.post('/personas/:personaId/direcciones', vincularDireccionPersona);
module.exports = router;