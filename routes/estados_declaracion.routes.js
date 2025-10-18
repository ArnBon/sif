const { Router } = require('express');
const { getEstadosDeclaracion, actualizarEstadosDeclaracion } = require('../controllers/dec_salud/estados_declaracion.controller');

const router = Router();

router.get('/', getEstadosDeclaracion);
router.put('/:id', actualizarEstadosDeclaracion);


module.exports = router;