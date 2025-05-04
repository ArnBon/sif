/**Ruta: api/login */

const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controllers');
const { validarCamposVacios } = require('../middlewares/validarcamposvacios');
const { validarjwt } = require('../middlewares/validarjwt');

const router = Router();

router.post('/',
    [
        check('nombre_usuario', 'Campo obligatorio').not().isEmpty(),
        check('contrasena', 'Campo obligatorio').not().isEmpty(),
        validarCamposVacios,
               
    ],
    login
);

module.exports = router;