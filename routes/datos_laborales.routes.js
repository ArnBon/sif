const { Router } = require('express');
const { getdatosLaborales,getdatosLaboralesId,creardatosLaborales,actualizardatosLaborales,eliminardatosLaborales } = require('../controllers/datos_laborales.controller');


const router = Router();
router.get('/', getdatosLaborales);
router.get('/:id',getdatosLaboralesId);
router.post('/', creardatosLaborales);
router.put('/:id', actualizardatosLaborales);
router.delete('/:id', eliminardatosLaborales);

module.exports = router;