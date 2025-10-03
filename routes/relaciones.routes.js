const { Router } = require('express');

const { getRelaciones,  crearRelacion, eliminarRelacion } = require('../controllers/relaciones.controller');

const router = Router();

router.get('/', getRelaciones);
router.post('/', crearRelacion);
router.delete('/:id', eliminarRelacion);

module.exports = router;
