const { Router } = require('express');
const { getSolicitudesSeguro, getSolicitudSeguroId, crearSolicitudSeguro, actualizarSolicitudSeguro, eliminarSolicitudSeguro } = require('../controllers/solicitud_seguro.controllers');

const router = Router();

router.get('/', getSolicitudesSeguro);
router.get('/:id', getSolicitudSeguroId);
router.post('/', crearSolicitudSeguro);
router.put('/:id', actualizarSolicitudSeguro);
router.delete('/:id', eliminarSolicitudSeguro);

module.exports = router;
