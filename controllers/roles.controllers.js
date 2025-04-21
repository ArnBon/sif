const { response } = require('express');
const Rol = require('../models/roles.models');


const getRoles = async (req, res = response) => {
    
    try {
        const desde = Number(req.query.desde) || 0;
        const limite = Number(req.query.limite) || 100; // Agregué límite configurable

         // Validación básica de parámetros
        if (isNaN(desde) || isNaN(limite)) {
            return res.status(400).json({
                ok: false,
                msg: 'Los parámetros "desde" y "limite" deben ser números válidos'
            });
        }

         const [roles, total] = await Promise.all([
                    Rol.find({}, 'nombre_rol descripcion').skip(desde).limit(limite).lean(), // Usamos lean() para mejor performance
                    Rol.countDocuments()
                ]);

         res.json({
            ok: true,
            roles,
            total,
            paginacion: {
                desde,
                limite,
                siguiente: desde + limite < total ? desde + limite : null
            }
        }); 
        
    } catch (error) {
        console.error('Error en getRoles:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los roles',
            error: process.env.NODE_ENV === 'development' ? error.message : null
        });        
    }   
}


const getRolById = async (req, res = response) => {

        try {
            const id_rol = req.params.id;
    
            // 1 Buscar rol por ID
            const rolDB = await Rol.findById(id_rol)
                .select('nombre_rol descripcion')//selecciono campos
                .lean() //convertir a objeto simple para mejor manipulacion
    
                if (!rolDB) {
                    return res.status(404).json({
                        msg: 'Rol no encontrado'
                    });                
                }
            res.json({
                ok:true,
                rolDB
            });        
        } catch (error) {
            console.error('Error al obtener rol:', error);
            // 3 Manejar específicamente errores de ID inválido
            if (error.name === 'CastError') {
                return res.status(400).json({
                    ok: false,
                    msg: 'Id del rol no válido'
                });            
            }
            res.status(500).json({
                ok: false,
                msg: 'Error al obtener el rol',
                error: process.env.NODE_ENV === 'development' ? error.message : null
            });
        }
}


const crearRol = async (req, res = response) => {

       const {  nombre_rol, descripcion } = req.body;
   
       try {
          // 1 Crear rol
           const rol = new Rol({
               ...req.body
           });
   
             
          // 3 Guardar el rol en la bd
           await rol.save();
           res.json({
               ok:true,
               msg:'rol creado satisfactoriamente...',
               rol: {
                   id_rol: rol._id,
                   nombre_rol: rol.nombre_rol,
                   descripcion: rol.descripcion
               } 
           })
   
          // 4 Generar el token
   
   
          
       } catch (error) {
          console.error('No se pudo guardar el registro:', error);
               res.status(500).json({
                   ok: false,
                   msg: 'No se pudo guardar el registro',
                   error
               });  
       }  
}


const editarRol = async (req, res = response) => {
     const id_rol = req.params.id;
    
       try {
    
            //1.- encuentra el id_rol del rol
            const rolDB = await Rol.findById(id_rol);
    
            if (!rolDB) {
                return res.status(404).json({
                    ok:true,
                    msg:'rol no encontrado por id'
                });           
            }
    
            //2.- actualiza el registro de los campos de la tabla por ese id_rol
            const campos = req.body;    
           
    
            //4.- Actuzlizar al rol en la bd
            const modificarrol = await Rol.findByIdAndUpdate(id_rol, campos, {new: true});
    
                res.json({
                    ok:true,
                    rol: modificarrol
                });
       } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'No se pudo actualizar al rol'
        });    
       }
}


const borrarRol = async (req, res = response) => {
        const id_rol = req.params.id;
    
        try {
    
        //1.- encuentra el id_rol
        const rolDB = await Rol.findById(id_rol);
    
               if (!rolDB) {
            return res.status(404).json({
                ok:true,
                msg: 'rol no encontrado por id'
            });        
        }
         //2.- elimina el registro como tal
         await Rol.findByIdAndDelete(id_rol);
            res.json({
                ok:true,
                msg:'rol eliminado...'
            });
        
    
    
            
        } catch (error) {
            console.log(error);
                res.status(500).json({
                    ok: false,
                    msg: 'No se pudo eliminar el registro de rol'
                });
        }
}


module.exports = {
    getRoles,
    getRolById,
    crearRol,
    editarRol,
    borrarRol
}