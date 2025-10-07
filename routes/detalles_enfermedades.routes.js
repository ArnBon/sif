const { Router } = require('express');
const { getDetallesEnfermedades,getDetallesEnfermedadesId,
crearDetallesEnfermedades, actualizarDetallesEnfermedades,
eliminarDetallesEnfermedades } = require('../controllers/dec_salud/detalles_enfermedades.controller');

const router = Router();

router.get('/', getDetallesEnfermedades);
router.get('/:id', getDetallesEnfermedadesId);
router.post('/', crearDetallesEnfermedades);
router.put('/:id', actualizarDetallesEnfermedades);
router.delete('/:id', eliminarDetallesEnfermedades);

module.exports = router;