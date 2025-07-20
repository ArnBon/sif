const { response } = require('express');
const Persona = require('../models/personas.model');
const { parsearFechaNacimientoCrear, parsearFechaNacimientoActualizar, formatearFechaRespuesta, validarFecha } = require('../middlewares/validarfechas');


    const getPersona = async (req, res = response) => {
        try {
            // Obtener todas las personas con los campos deseados
            const personas = await Persona.find({}, 'id_persona id_genero id_tipo_persona id_edo_civil primer_apellido segundo_apellido primer_nombre segundo_nombre fecha_nac tipo_identificacion cedula pasaporte rif email foto_url activo fecha_creacion fecha_actualizacion');
            res.json({
                ok: true,
                personas // Devuelve la lista de personas con fechas formateadas
            });
            
        } catch (error) {
            console.error(error);
            res.status(500).json({
                ok: false,
                msg: 'Error al obtener las personas.'
            });
        }
    }


    const getPersonaId = async (req, res = response) => {
        const pid = req.params.id;

        try {
            // Encuentra la persona por ID
            const personaDB = await Persona.findById(pid)
            .populate('id_genero', 'descripcion codigo')
            .populate('id_estado_civil', 'descripcion codigo')
            .populate('id_tipo_persona', 'descripcion codigo');
    
            if (!personaDB) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe usuario por ese ID.'
                });
            }
            res.json({
                ok: true,
                persona: personaResponse
            });
            
        } catch (error) {
            console.error(error);
            res.status(500).json({
                ok: false,
                msg: 'Error al obtener la persona.'
            });
        }
    }

    
    const crearPersona = async (req, res = response) => {
    const persona = new Persona(req.body); // Crear el objeto Persona
    try {
        await persona.save(); // Guardar en la base de datos
        res.json({
            ok: true,
            persona
        });
        } catch (error) {
            console.error('Error al guardar la persona:', error);
            res.status(500).json({
                ok: false,
                msg: 'Error al guardar la persona',
                error
            });
        }
    }


    const actualizarPersona = async (req, res = response) => {
        const pid = req.params.id;

        try {
            //1.- encuntra el pid de la persona
            const personaDB = await Persona.findById(pid);
    
            if( !personaDB ){
                return res.status(404).json({
                    ok: true,
                    msg: 'No existe usuario por ese id mejorar este mensaje'
                });
            }
    
            //2.- actualiza el resitro por ese pid
            const campos = req.body; //son los campos del endpoint | postman

    
            //2.2.- Eliminar campos que no deseo actualizar
            delete campos.ci_pasaporte_rif;
            delete campos.id_genero;        
            
            //3.- Actuzlizar la persona en la bd
                const edicionPersona = await Persona.findByIdAndUpdate(pid, campos, {new: true} );
                /*
                Actualización con Opción { new: true }: Al usar findByIdAndUpdate, se añade { new: true }
                como opción para que Mongoose devuelva el documento actualizado en lugar del original.
                */        
                res.json({
                    ok: true,
                    persona: edicionPersona
                });
                
            } catch (error) {  
                console.log(error);
                res.status(500).json({
                    ok: false,
                    msg: 'error al actualizar mejorar este mensaje'
                });                
            }
    }


    const eliminarPersona = async (req, res = response) => {
        const pid = req.params.id;
    try {

         //1.- encuntra el pid de la persona
        const personaDB = await Persona.findById(pid);

        if( !personaDB ){
            return res.status(404).json({
                ok: true,
                msg: 'No existe usuario por ese id mejorar este mensaje'
            });
        }
        await Persona.findByIdAndDelete(pid);


        res.json({
            ok: true,
            msg: 'Registro eliminado !'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        });
    }
    }

module.exports = {
    getPersona,
    getPersonaId,
    crearPersona,
    actualizarPersona,
    eliminarPersona
}



