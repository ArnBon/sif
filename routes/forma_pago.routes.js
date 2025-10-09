const { Router } = require('express');
const { getFormaPago, getFormaPagoId, crearFormaPago,actualizarFormaPago,
eliminarFormaPago } = require('../controllers/forma_pago/formas_pago.controller');

const router = Router();

router.get('/', getFormaPago);
router.get('/:id', getFormaPagoId);
router.post('/', crearFormaPago);
router.put('/:id', actualizarFormaPago);
router.delete('/:id', eliminarFormaPago);

module.exports = router;