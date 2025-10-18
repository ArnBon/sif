const { Router } = require('express');
const { getBanco, getBancoId, crearBanco,actualizarBanco,
eliminarBanco } = require('../controllers/forma_pago/banco.controllers');

const router = Router();

router.get('/', getBanco);
router.get('/:id', getBancoId);
router.post('/', crearBanco);
router.put('/:id', actualizarBanco);
router.delete('/:id', eliminarBanco);

module.exports = router;