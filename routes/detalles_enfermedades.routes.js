const { Router } = require('express');
const { getDetallesEnfermedades,
        getDetallesEnfermedadesId,
        getDetalleByRespuesta,
        crearDetallesEnfermedades,
        actualizarDetallesEnfermedades,
        eliminarDetallesEnfermedades
     } = require('../controllers/dec_salud/detalles_enfermedades.controller');

const router = Router();

router.get('/', getDetallesEnfermedades);
router.get('/respuesta/:idRespuesta', getDetalleByRespuesta);
router.get('/:id', getDetallesEnfermedadesId);
router.post('/', crearDetallesEnfermedades);
router.put('/:id', actualizarDetallesEnfermedades);
router.delete('/:id', eliminarDetallesEnfermedades);

module.exports = router;


