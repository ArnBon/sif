const { Router } = require('express');
const { getRespuestasDeclaracion,
getRespuestasDeclaracionId,
crearRespuestasDeclaracion,
actualizarRespuestasDeclaracion,
eliminarRespuestasDeclaracion } = require('../controllers/dec_salud/respuesta_declaracion.controller');

const router = Router();

router.get('/', getRespuestasDeclaracion);
router.get('/:id', getRespuestasDeclaracionId);
router.post('/', crearRespuestasDeclaracion);
router.put('/:id', actualizarRespuestasDeclaracion);
router.delete('/:id', eliminarRespuestasDeclaracion);

module.exports = router;