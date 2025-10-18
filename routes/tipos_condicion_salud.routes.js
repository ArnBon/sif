const { Router } = require('express');
const { getTiposCondicionSalud,
        getTipoCondicionSaludId,
        crearTipoCondicionSalud,
        actualizarTipoCondicionSalud,
        eliminarTipoCondicionSalud } = require('../controllers//dec_salud/tipos_condicion_salud.controller');

const router = Router();

router.get('/', getTiposCondicionSalud);
router.get('/:id', getTipoCondicionSaludId);
router.post('/', crearTipoCondicionSalud);
router.put('/:id', actualizarTipoCondicionSalud);
router.delete('/:id', eliminarTipoCondicionSalud);


module.exports = router;