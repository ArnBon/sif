const { Router } = require('express');
const { crearPlan, actualizarPlan, eliminarPlan } = require('../controllers/planes.controller');

const router = Router();


router.post('/', crearPlan);

router.put('/:id', actualizarPlan);

router.delete('/:id', eliminarPlan);

module.exports = router;
