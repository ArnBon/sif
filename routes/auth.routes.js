/**Ruta: api/login 
 * Ruta: api/auth/solicitar-recuperacion
 * Ruta: api/auth/reestablecer-contrasena
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { login, solicitarRecuperacion, reestablecerContrasena } = require('../controllers/auth.controllers');
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
/*Para recuperacion de contraseña 18-05-2025*/
router.post('/solicitar-recuperacion', solicitarRecuperacion);
router.post('/reestablecer-contrasena', reestablecerContrasena);

module.exports = router;