const { Router } = require('express');
const { getPersona,getPersonaId,crearPersona,actualizarPersona,eliminarPersona } = require('../controllers/personas.controller');
const { parsearFechaNacimientoCrear, parsearFechaNacimientoActualizar, formatearFechaRespuesta} = require('../middlewares/validarfechas');

const router = Router();

router.get('/', formatearFechaRespuesta, getPersona);
router.get('/:id', formatearFechaRespuesta, getPersonaId);


router.post('/', [
        parsearFechaNacimientoCrear,
        formatearFechaRespuesta
], crearPersona
);

router.put('/:id', [
        parsearFechaNacimientoActualizar,
        formatearFechaRespuesta
], actualizarPersona
);
router.delete('/:id', eliminarPersona);
module.exports = router;