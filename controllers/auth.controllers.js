const { response } = require('express');
const Usuario = require('../models/usuarios.models');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const login = async(req, res = response) => {

//Colocar los campos del login
const { nombre_usuario, contrasena } = req.body;

    try {          
        //1.- validar el nombre de usuario
        const usuarioDB = await Usuario.findOne({ nombre_usuario });

            if (!usuarioDB) {
                return res.status(404).json({
                    ok:false,
                    msg: 'Error nombre usuario mejorar este mensaje '
                });  
            }




        //2.- valida la contraseña
        const validarContrasena = bcrypt.compareSync(contrasena, usuarioDB.contrasena);

            if (!validarContrasena) {
                return res.status(400).json({
                    ok:false,
                    msg: 'Error en contraseña mejorar este mensaje'
                });                
            }

        //3.- Generar el token
        const token = await generarJWT(usuarioDB.id);
            res.json({
                ok:true,                
                token
            });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error comunicarse con el administrador'
        });        
    }
}
module.exports = {
    login
}