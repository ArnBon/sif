const { Router } = require('express');
const { getServiciosContratado, getServicioContratadoById, crearServicioContratado, actualizarServicioContratado, eliminarServicioContratado } = require('../controllers/servicios_contratados.controller');

const router = Router();

router.get('/', getServiciosContratado);
router.get('/:id', getServicioContratadoById);
router.post('/', crearServicioContratado);
router.put('/:id', actualizarServicioContratado);
router.delete('/:id', eliminarServicioContratado);

module.exports = router;
