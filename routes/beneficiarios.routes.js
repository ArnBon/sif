const { Router } = require('express');
const { getBeneficiarios, crearBeneficiario, eliminarBeneficiario } = require('../controllers/beneficiario.controllers');

const router = Router();

router.get('/', getBeneficiarios);
router.post('/', crearBeneficiario);
router.delete('/:id', eliminarBeneficiario);

module.exports = router;