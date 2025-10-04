const { Router } = require('express');
const { getRelacion,  crearRelacion, eliminarRelacion } = require('../controllers/relacion.controllers');

const router = Router();

router.get('/', getRelacion);
router.post('/', crearRelacion);
router.delete('/:id', eliminarRelacion);

module.exports = router;
