const { response } = require('express');
const bcrypt = require( 'bcryptjs' );
const Usuario = require('../models/usuarios.models');


const getUsuarios = async(req, res = response) => {
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

        const [usuarios, total] = await Promise.all([
            Usuario.find({}, 'nombre_usuario email fecha_creacion estatus') // Corregí 'estado' a 'estatus' para coincidir con tu modelo
                .skip(desde)
                .limit(limite)
                .lean(), // Usamos lean() para mejor performance
            Usuario.countDocuments()
        ]);

        // Función para formatear la fecha (la moví fuera del bloque try para reutilización)
        const formatearFecha = (fecha) => {
            if (!(fecha instanceof Date)) return 'Fecha inválida';
            
            const dia = String(fecha.getDate()).padStart(2, '0');
            const mes = String(fecha.getMonth() + 1).padStart(2, '0');
            const anio = fecha.getFullYear();
            return `${dia}-${mes}-${anio}`;
        };

        // Formatear las fechas
        const usuariosFormateados = usuarios.map(usuario => ({
            ...usuario,
            fecha_creacion: formatearFecha(usuario.fecha_creacion)
        }));

        res.json({
            ok: true,
            usuarios: usuariosFormateados,
            total,
            paginacion: {
                desde,
                limite,
                siguiente: desde + limite < total ? desde + limite : null
            }
        });

    } catch (error) {
        console.error('Error en getUsuario:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los usuarios',
            error: process.env.NODE_ENV === 'development' ? error.message : null
        });
    }
};

const getUsuarioById = async(req, res = response) => {
    try {
        const id_usuario = req.params.id;

        // 1 Buscar usuario por ID
        const usuarioDB = await Usuario.findById(id_usuario)
            .select('nombre_usuario email fecha_creacion estatus')//selecciono campos
            .lean() //convertir a objeto simple para mejor manipulacion

            if (!usuarioDB) {
                return res.status(404).json({
                    msg: 'Usuario no encontrado'
                });                
            }

        // 2 Formatear fecha si es necesario
        if (usuarioDB.fecha_creacion) {
            usuarioDB.fecha_creacion = new Date(usuarioDB.fecha_creacion).toLocaleDateString();            
        }
        res.json({
            ok:true,
            usuarioDB
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

const crearUsuario = async (req, res = response) => {

    const {  nombre_usuario, contrasena, email, fecha_creacion, estatus } = req.body;

    try {
       // 1 Crear usuario
        const usuario = new Usuario({
            ...req.body
        });

       // 2 Encriptar contraseña
       const salt = bcrypt.genSaltSync();
       usuario.contrasena = bcrypt.hashSync( contrasena, salt);

       // 3 Guardar el usuario en la bd
        await usuario.save();
        res.json({
            ok:true,
            msg:'usuario creado satisfactoriamente...',
            usuario: {
                id_usuario: usuario._id,
                nombre_usuario: usuario.nombre_usuario,
                email: usuario.email,
                estatus: usuario.estatus
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

const editarUsuario = async (req, res = response) => {
   const id_usuario = req.params.id;

   try {

        //1.- encuentra el id_usuario del usuario
        const usuarioDB = await Usuario.findById(id_usuario);

        if (!usuarioDB) {
            return res.status(404).json({
                ok:true,
                msg:'usuario no encontrado por id'
            });           
        }

        //2.- actualiza el registro por ese id_usuario
        const campos = req.body;

        //3.- Eliminar campos que no deseo actualizar
        delete campos.contrasena;
        delete campos.fecha_creacion;
        delete campos.id_usuario;

        //4.- Actuzlizar al usuario en la bd
        const modificarUsuario = await Usuario.findByIdAndUpdate(id_usuario, campos, {new: true});

            res.json({
                ok:true,
                usuario: modificarUsuario
            });
   } catch (error) {
    res.status(500).json({
        ok:false,
        msg: 'No se pudo actualziar al usuario'
    });    
   }
}


const borrarUsuario = async (req, res = response) => {

    const id_usuario = req.params.id;

    try {

    //1.- encuentra el uid
    const usuarioDB = await Usuario.findById(id_usuario);

           if (!usuarioDB) {
        return res.status(404).json({
            ok:true,
            msg: 'Usuario no encontrado por id'
        });        
    }
     //2.- elimina el registro como tal
     await Usuario.findByIdAndDelete(id_usuario);
        res.json({
            ok:true,
            msg:'Usuario eliminado...'
        });
    


        
    } catch (error) {
        console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'No se pudo eliminar el registro de usuario'
            });
    }
   
}


module.exports = {
    getUsuarios,
    getUsuarioById,
    crearUsuario,
    editarUsuario,
    borrarUsuario
}