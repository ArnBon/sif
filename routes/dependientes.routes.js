const { Router } = require('express');
const { getDependientes, crearDependiente, eliminarDependiente } = require('../controllers/dependiente.controllers');

const router = Router();

router.get('/', getDependientes);
router.post('/', crearDependiente);
router.delete('/:id', eliminarDependiente);

module.exports = router;