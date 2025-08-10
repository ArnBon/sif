const {router} = require('express');
const { crearSolicitudCobertura, eliminarSolicitudCobertura } = require('../controllers/solicitud_cobertura.controller');

const router = Router();


router.post('/',crearSolicitudCobertura);
router.delete('/:id', eliminarSolicitudCobertura);

module.exports = router;
