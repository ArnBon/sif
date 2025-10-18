const { Router } = require('express');
const { getPagos, getPagosId, crearPagos, actualizarPagos,
eliminarPagos } = require('../controllers/forma_pago/pago.controllers');

const router = Router();

router.get('/', getPagos);
router.get('/:id', getPagosId);
router.post('/', crearPagos);
router.put('/:id', actualizarPagos);
router.delete('/:id', eliminarPagos);

module.exports = router;