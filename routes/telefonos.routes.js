const { Router } = require('express');
const { getTelefono,getTelefonoId,crearTelefono,actualizarTelefono,eliminarTelefono } = require('../controllers/telefono.controller');


const router = Router();

router.get('/', getTelefono);
router.get('/:id', getTelefonoId);
router.post('/', crearTelefono);
router.put('/:id', actualizarTelefono);
router.delete('/:id',eliminarTelefono);


module.exports = router;