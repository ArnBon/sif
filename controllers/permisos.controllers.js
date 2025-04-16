const { response } = require('express');
const Permiso = require('../models/permisos.models');




    const getPermisos = async(req, res = response) => {
        try {
            const desde = Number(req.query.desde) || 0;
            const limite = Number(req.query.limite) || 100;

            if (isNaN(desde) || isNaN(limite)) {
                return res.status(404).json({
                    ok:false,
                    msg: 'Los parámetros "desde" y "limite" deben ser números válidos'
                });                
            }

            const [permisos, total] = await Promise.all([
                Permiso.find({}, 'nombre_permiso descripcion').skip().limit().lean(), 
                Permiso.countDocuments()
            ]);
            res.json({
                ok: true,
                permisos,
                total,
                paginacion: {
                    desde,
                    limite,
                    siguiente: desde + limite < total ? desde + limite : null
                }
            });
            
        } catch (error) {
            console.error('Error en getPermisos:', error);
            res.status(500).json({
                ok:false,
                msg: 'Error al obtener el permiso',
                error: process.env.NODE_ENV === 'development' ? error.message : null
            });            
        }
    }


    const getPermisoById = async(req, res = response) => {
        
        
        try {
            const id_permiso = req.params.id

            //1.- encontrar el id del rol
             const permisoDB = await Permiso.findById(id_permiso)
              .select('nombre_permiso descripcion')//selecciono campos
              .lean() //convertir a objeto simple para mejor manipulacion

             if (!permisoDB) {
                return res.status(404).json({
                    ok:true,
                    msg: 'No existe registro'
                });                
             }
             res.json({
                ok:true,
                permisoDB
             });
            

            
        } catch (error) {
            console.error('Error al obtener usuario:', error);
        // 3 Manejar específicamente errores de ID inválido
        if (error.name === 'CastError') {
            return res.status(400).json({
                ok: false,
                msg: 'Id de usuario no válido'
            });            
        }
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener el usuario',
            error: process.env.NODE_ENV === 'development' ? error.message : null
        });
            
        }
    }


    const crearPermiso = async(req, res = response) => {

        const { nombre_permiso, descripcion } = req.body;

        try {
            // 1 Crear usuario
            const permiso = new Permiso({
                ...req.body
            });

            // 2 Guardar el usuario en la bd
            await permiso.save();
            res.json({
                ok:true,
                msg:'permiso creado satisfactoriamente...',
                permiso: {
                    id_permiso: permiso._id,
                    nombre_permiso:permiso.nombre_permiso,
                    descripcion:permiso.descripcion
                }
            });
            
        } catch (error) {
            console.log('No se pudo guardar el registro:', error);
            res.status(500).json({
                ok:false,
                msg: 'No se pudo guardar el registro',
                error
            });            
        }
    }


    const editarPermiso = async(req, res = response) => {
        res.json({
            ok:true,
            msg:'Editando permiso'
        })
    }
    const borrarPermiso = async(req, res = response) => {
        res.json({
            ok:true,
            msg:'Borrando permiso'
        })
    }

module.exports = {
    getPermisos, 
    getPermisoById,
    crearPermiso,
    editarPermiso,
    borrarPermiso
}