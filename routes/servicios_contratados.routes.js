const { Router } = require('express');
const { getCoberturas, getCoberturaId, crearCobertura, actualizarCobertura, eliminarCobertura } = require('../controllers/coberturas.controller');

const router = Router();

router.get('/', getCoberturas);
router.get('/:id', getCoberturaId);
router.post('/',crearCobertura);
router.put('/:id', actualizarCobertura);
router.delete('/:id', eliminarCobertura);

module.exports = router;
