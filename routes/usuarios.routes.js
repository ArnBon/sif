const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, crearUsuario, editarUsuario, borrarUsuario } = require('../controllers/usuarios.controllers');


const router = Router();


router.get('/', getUsuarios );
router.post('/', crearUsuario);
router.put('/:id', editarUsuario);
router.delete('/:id', borrarUsuario);



module.exports = router;