const { Router } = require('express');
const {getTiposIntervencion,getTiposIntervencionId, crearTiposIntervencion, actualizarTiposIntervencion, eliminarTiposIntervencion} = require('../controllers/tipos_intervencion.controller');

const router = Router();

router.get('/', getTiposIntervencion);
router.get('/:id', getTiposIntervencionId);
router.post('/', crearTiposIntervencion);
router.put('/:id', actualizarTiposIntervencion);
router.delete('/:id', eliminarTiposIntervencion);

module.exports = router;