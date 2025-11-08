const { Router } = require('express');
const { getDeclaracionSalud, 
        getDeclaracionSaludId, 
        getDeclaracionesByPersona,
        crearDeclaracionSalud,
        actualizarDeclaracionSalud,
        updateDeclaracionesByPersona,
        eliminarDeclaracionSalud } = require('../controllers/dec_salud/declaracion_salud.controller');

const router = Router();

// GET - Consultas
router.get('/', getDeclaracionSalud);                    // Todas las declaraciones
router.get('/persona/:idPersona', getDeclaracionesByPersona); // Por persona (CORREGIDO)
router.get('/:id', getDeclaracionSaludId);               // Una declaración específica

// POST - Crear
router.post('/', crearDeclaracionSalud);                 // Nueva declaración

// PUT - Actualizar  
router.put('/:id', actualizarDeclaracionSalud);          // Una declaración específica
router.put('/persona/:idPersona', updateDeclaracionesByPersona); // Masivo por persona (CORREGIDO)

// DELETE - Eliminar
router.delete('/:id', eliminarDeclaracionSalud);         // Una declaración específica


module.exports = router;