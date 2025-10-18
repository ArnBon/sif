const { Router } = require('express');
const { 
    getPreguntasDeclaracion,
    getPreguntasDeclaracionId,
    actualizarPreguntasDeclaracion,
    activarPreguntaDeclaracion,
    desactivarPreguntaDeclaracion,
    getPreguntasActivas,
    getPreguntasInactivas,
    crearPreguntasDeclaracion,
    eliminarPreguntasDeclaracion 
} = require('../controllers/dec_salud/preguntas_declaracion.controller');

const router = Router();

router.get('/', getPreguntasDeclaracion);
router.get('/activas', getPreguntasActivas);
router.get('/inactivas', getPreguntasInactivas);
router.post('/', crearPreguntasDeclaracion);

router.get('/:id', getPreguntasDeclaracionId);
router.put('/:id', actualizarPreguntasDeclaracion);
router.put('/:id/activar', activarPreguntaDeclaracion);
router.put('/:id/desactivar', desactivarPreguntaDeclaracion);
router.delete('/:id', eliminarPreguntasDeclaracion);

module.exports = router;