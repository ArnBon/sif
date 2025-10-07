const { Router } = require('express');
const { getEstadosDeclaracion } = require('../controllers/dec_salud/estados_declaracion.controller');

const router = Router();

router.get('/', getEstadosDeclaracion);


module.exports = router;