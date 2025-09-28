const { Router } = require('express');
const { crearPersonaPlan, actualizarPersonaPlan, eliminarPersonaPlan } = require('../controllers/personas_planes.controller');

const router = Router();


router.post('/', crearPersonaPlan);

router.put('/:id', actualizarPersonaPlan);

router.delete('/:id', eliminarPersonaPlan);

module.exports = router;
