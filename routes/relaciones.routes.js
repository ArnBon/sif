const { Router } = require('express');

const { getRelaciones, getRelacionId, crearRelacion, actualizarRelacion, eliminarRelacion } = require('../controllers/relaciones.controller');

const router = Router();

router.get('/', getRelaciones);
router.get('/:id', getRelacionId);
router.post('/', crearRelacion);
router.put('/:id', actualizarRelacion);
router.delete('/:id', eliminarRelacion);

module.exports = router;
