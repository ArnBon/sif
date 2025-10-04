const { Router } = require('express');
const { getDeclaracionSalud, getDeclaracionSaludId, 
    crearDeclaracionSalud,
     actualizarDeclaracionSalud,
      eliminarDeclaracionSalud } = require('../controllers/declaracion_salud.controller');

const router = Router();

router.get('/', getDeclaracionSalud);
router.get('/:id', getDeclaracionSaludId);
router.post('/', crearDeclaracionSalud);
router.put('/:id', actualizarDeclaracionSalud);
router.delete('/:id', eliminarDeclaracionSalud);

module.exports = router;