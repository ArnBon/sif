const { Router } = require('express');
const { getEstadosDeclaracion, actualizarEstadosDeclaracion, crearEstadoDeclaracion } = require('../controllers/dec_salud/estados_declaracion.controller');

const router = Router();


router.post('/', crearEstadoDeclaracion); // Temporal para desarrollo http://localhost:3000/api/estadosdeclaracion/
router.get('/', getEstadosDeclaracion);
router.put('/:id', actualizarEstadosDeclaracion);


module.exports = router;