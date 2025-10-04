const { Router } = require('express');
const { getEstadosDeclaracion } = require('../controllers/estados_declaracion.controller');

const router = Router();

router.get('/', getEstadosDeclaracion);


module.exports = router;