const { response } = require('express');
const Rol = require ('../models/roles.models');
const Permiso = require ('../models/permisos.models');


const asignarPermisoRol = async(req, res = response) => {

    const { rolId, permisoId } = req.body
    
    
    try {

    //1 Buscar el rol por su _id
    const rol = await Rol.findById(rolId);

    if (!rol) {
        return res.status(404).json({
            ok:false,
            msg:'El rol no existe',
        });        
    }

    //2 Verificar si el permiso existen
    const permisos = await Permiso.find({ _id:{$in: permisoId} });

    if (permisos.length !== permisoId.length) {
        return res.status(404).json({
            ok:false,
            msg: 'El permiso no existe'
        });        
    }

    //3 Asignar los permisos al rol
    rol.permisos = permisoId;
    await rol.save();
    res.json({
        ok:true,
        rol,
        permisos
    });
        
    } catch (error) {
        console.error('No se pudo asignar el permiso: ', error);
        res.status(500).json({
            ok: false,
            msg: 'No se pudo asignar el permiso',
            error            
        });        
    }
}
module.exports = {
    asignarPermisoRol,
}