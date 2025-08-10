const { Router } = require('express');
const { getCoberturas, crearCobertura, actualizarCobertura, eliminarCobertura } = require('../controllers/coberturas.controller');


const router = Router();

router.get('/', getCoberturas);
router.post('/', crearCobertura); 
router.put('/:id', actualizarCobertura);
router.delete('/:id', eliminarCobertura);

module.exports = router;
