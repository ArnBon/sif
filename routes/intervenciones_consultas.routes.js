const { Router } = require('express');
const { getIntervencionesConsultas, getIntervencionesConsultasId, crearIntervencionesConsultas,actualizarIntervencionesConsultas,
eliminarIntervencionesConsultas } = require('../controllers/dec_salud/intervenciones_consultas.controller');

const router = Router();

router.get('/', getIntervencionesConsultas);
router.get('/:id', getIntervencionesConsultasId);
router.post('/', crearIntervencionesConsultas);
router.put('/:id', actualizarIntervencionesConsultas);
router.delete('/:id', eliminarIntervencionesConsultas);

module.exports = router;