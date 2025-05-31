const { response } = require('express');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuarios.models');
const Recupera = require('../models/recuperacion.model');
const { enviarCorreo } = require('../helpers/enviarmail');



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

const solicitarRecuperacion = async (req, res = response) => {
    try {
            const { correo } = req.body;
            const usuario = await Usuario.findOne({ email: correo }); //esto viene del modelo de usuario el campo email

            if(!usuario) return res.status(404).json({message: 'Usuario no encontrado'})
        //1.- Generar token y fecha de expiración
            const token = crypto.randomBytes(32).toString('hex');
            const fechaexpiracion = new Date(Date.now() + 3600000); //una hora
        //2.- Guardar en DB
        await Recupera.create({
            idusuario: usuario._id,
            token,
            fechaexpiracion
        });
        //3.- Enviar correo
        const enlace = `http://localhost:3000/restablecer?token=${token}`;
        await enviarCorreo({
            to:correo,
            subject:'Recuperación de contraseña',
            html: `Haz clic <a href="${enlace}">aquí</a> para restablecer tu contraseña`
        });
        res.status(200).json({ message: 'Correo de recuperacion enviado' });
    } catch (error) {
        res.status(500).json({ message: error.message });        
    }
}

const reestablecerContrasena = async (req, res = response) => {
try {
    const { token, nuevaContrasena } = req.body;

    const rec = await Recupera.findOne({ token })
    .populate('idusuario');

    if(!rec){
        return res.status(400).json({
            message: 'Token invalido'
        });
    }
    if (new Date() > rec.fechaexpiracion ) {
        return res.status(400).json({
            message: 'Token expirado'
        });        
    }  
     // Encripta la nueva contraseña antes de guardarla
     const salt = bcrypt.genSaltSync(10);
     const hash = bcrypt.hashSync(nuevaContrasena, salt);  
    //1.- Actualizar contraseña
    await Usuario.findByIdAndUpdate(
        rec.idusuario._id,
        { contrasena: hash }, // Objeto con los campos a actualizar
        { new: true } // Opción para devolver el documento actualizado
    );           
    /*
    ¡Ahí está el detalle! Si estás usando findByIdAndUpdate
    (como en el código que te compartí), no necesitas usuario.save(), 
    porque es una actualización directa en la BD. Pero si prefieres
    usar el enfoque tradicional con save(), aquí te muestro ambas opciones corregidas:
    
    */
            //2.- Eliminar registro de recuperación
    await Recupera.deleteOne({token});

    res.status(200).json({ message: 'Contraseña actualizada exitosamente' }); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    login,
    solicitarRecuperacion,
    reestablecerContrasena
}