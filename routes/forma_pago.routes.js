const { Router } = require('express');
const { getFormaPago, getFormaPagoId, crearFormaPago,actualizarFormaPago,
eliminarFormaPago } = require('../controllers/forma_pago/forma_pago.controllers');

const router = Router();

router.get('/', getFormaPago);
router.get('/:id', getFormaPagoId);
router.post('/', crearFormaPago);
router.put('/:id', actualizarFormaPago);
router.delete('/:id', eliminarFormaPago);

module.exports = router;