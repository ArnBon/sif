const { Router } = require('express');
const { getBeneficiarios, getBeneficiarioId, crearBeneficiario, actualizarBeneficiario, eliminarBeneficiario } = require('../controllers/beneficiarios.controller');


const router = Router();

router.get('/', getBeneficiarios);
router.get('/:id', getBeneficiarioId);
router.post('/', crearBeneficiario);
router.put('/:id', actualizarBeneficiario);
router.delete('/:id', eliminarBeneficiario);

module.exports = router;