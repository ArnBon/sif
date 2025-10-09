const { Router } = require('express');
const { getTipoCuenta, getTipoCuentaId, crearTipoCuenta, actualizarTipoCuenta,
eliminarTipoCuenta } = require('../controllers/forma_pago/tipo_cuenta.controller');

const router = Router();

router.get('/', getTipoCuenta);
router.get('/:id', getTipoCuentaId);
router.post('/', crearTipoCuenta);
router.put('/:id', actualizarTipoCuenta);
router.delete('/:id', eliminarTipoCuenta);

module.exports = router;