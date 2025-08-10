const { Router } = require('express');
const { getPlanes, crearPlan, actualizarPlan, eliminarPlan } = require('../controllers/planes.controller');

const router = Router();

router.get('/', getPlanes);
router.post('/', crearPlan);
router.put('/:id', actualizarPlan);
router.delete('/:id', eliminarPlan);

module.exports = router;
