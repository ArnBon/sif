const { Router } = require('express');
const { getDireccion,getDireccionId,crearDireccion,actualizarDireccion,eliminarDirecion } = require('../controllers/direccion.controller');


const router = Router();
router.get('/', getDireccion);
router.get('/:id',getDireccionId);
router.post('/', crearDireccion);
router.put('/:id', actualizarDireccion);
router.delete('/:id', eliminarDirecion);

module.exports = router;