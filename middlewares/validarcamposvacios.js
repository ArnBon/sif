 const { response } = require('express');
 const { validationResult } = require('express-validator');
 const Usuario  = require('../models/usuarios.models');
 const Rol = require('../models/roles.models'); 
 const Permiso = require('../models/permisos.models');  

 //Validacion para que los campos no queden vacios
const validarCamposVacios = (req, res = response, next ) => {

    const errores = validationResult(req);
    
       if (!errores.isEmpty() ) {
           return res.status(400).json({
               ok: false,
               errors:errores.mapped()
           });        
       }
       next();
}

module.exports = {
    validarCamposVacios,
    
}