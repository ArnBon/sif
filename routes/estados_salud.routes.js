const { Router } = require('express');
const { getEstadosSalud, getEstadosSaludId, crearEstadosSalud,
actualizarEstadosSalud, eliminarEstadosSalud } = require('../controllers/estados_salud.controller');

const router = Router();

router.get('/', getEstadosSalud);
router.get('/:id', getEstadosSaludId);
router.post('/', crearEstadosSalud);
router.put('/:id', actualizarEstadosSalud);
router.delete('/:id', eliminarEstadosSalud);

module.exports = router;