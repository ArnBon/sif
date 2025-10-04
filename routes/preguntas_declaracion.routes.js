const { Router } = require('express');
const {getPreguntasDeclaracion,
getPreguntasDeclaracionId,
crearPreguntasDeclaracion,
actualizarPreguntasDeclaracion,
eliminarPreguntasDeclaracion} = require('../controllers/preguntas_declaracion.controller');

const router = Router();

router.get('/', getPreguntasDeclaracion);
router.get('/:id', getPreguntasDeclaracionId);
router.post('/', crearPreguntasDeclaracion);
router.put('/:id', actualizarPreguntasDeclaracion);
router.delete('/:id', eliminarPreguntasDeclaracion);

module.exports = router;