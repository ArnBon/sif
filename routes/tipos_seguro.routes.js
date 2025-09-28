const { Router } = require('express');
const { getTiposSeguro,  getTipoSeguroPorId, crearTipoSeguro, actualizarTipoSeguro, eliminarTipoSeguro } = require('../controllers/tipos_seguro.controller');



const router = Router();

router.get('/', getTiposSeguro);
router.get('/:id', getTipoSeguroPorId);
router.post('/', crearTipoSeguro);
router.put('/:id', actualizarTipoSeguro);
router.delete('/:id', eliminarTipoSeguro);


module.exports = router;




