const { Router } = require('express');
const { getServicios, getServicioById, crearServicio, actualizarServicio, eliminarServicio } = require('../controllers/servicios_contratados.controller');

const router = Router();

router.get('/', getServicios);
router.get('/:id', getServicioById);
router.post('/',crearServicio);
router.put('/:id', actualizarServicio);
router.delete('/:id', eliminarServicio);

module.exports = router;
