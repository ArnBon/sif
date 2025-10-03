const { Router } = require('express');
const { getDependientes, crearDependientes, eliminarDependientes } = require('../controllers/dependientes.controller');

const router = Router();

router.get('/', getDependientes);
router.post('/', crearDependientes);
router.delete('/:id', eliminarDependientes);

module.exports = router;