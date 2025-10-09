const { Router } = require('express');
const { getBanco, getBancoId, crearBanco,actualizarBanco,
eliminarBanco } = require('../controllers/dec_salud/intervenciones_consultas.controller');

const router = Router();

router.get('/', getBanco);
router.get('/:id', getBancoId);
router.post('/', crearBanco);
router.put('/:id', actualizarBanco);
router.delete('/:id', eliminarBanco);

module.exports = router;