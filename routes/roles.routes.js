const { Router } = require('express');
const { getRoles, getRolById, crearRol, editarRol, borrarRol } = require('../controllers/roles.controllers');



const router = Router();

router.get('/', getRoles );
router.get('/:id', getRolById);
router.post('/', crearRol);
router.put('/:id', editarRol);
router.delete('/:id', borrarRol);


module.exports = router;