const { response } = require('express');
const Usuario = require('../models/usuarios.models');
const Rol = require('../models/roles.models');

const asignarRolUsuario = async(req, res = response) => {
    const { usuarioId, rolId } = req.body //esto viene del postman

    try {
    
        //1 Buscar el usuario por su _id
        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            });            
        }        
        
        //2 Verificar si el rol existe
        const rol = await Rol.findById(rolId);
            if (!rol) {
                return res.status(404).json({
                    ok: false,
                    msg: 'El rol para asignar no existe'
                });        
    }   
        
        //3 Asignar el rol al usuario
        usuario.roles.push(rolId);
        await usuario.save();
            res.json({
                ok:true,
                usuario,
                rol
            });        
        
    } catch (error) {
        console.error('No se pudo asignar el rol: ', error);
        res.status(500).json({
            ok: false,
            msg: 'No se pudo asignar el rol al usuario',
            error            
        });        
    }
}

module.exports = {
    asignarRolUsuario,
}
