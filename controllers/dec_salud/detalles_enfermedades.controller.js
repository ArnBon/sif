const { response } = require('express');
const DetalleEnfermedad = require('../../models/detalle_enfermedad.model');
const Persona = require('../../models/personas.model');
const TipoCondicionSalud = require('../../models/tipo_condicion_salud.model');
const RespuestaDeclaracion = require('../../models/respuesta_declaracion.model');


const getDetallesEnfermedades = async (req, res = response) => {
    try {
        //obtener todas las declaraciones
        const detalleEnfermedad = await DetalleEnfermedad.find({}, 'id_detalle id_respuesta id_medico_tratante id_tipo_condicion descripcion fecha_comienzo fecha_fin institucion_tratante examenes_practicados tratamiento estado_actual tiene_secuelas descripcion_secuelas fecha_creacion' )
        res.json({
            ok:true,
            detalleEnfermedad
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al encontrar los detalles de enfermedad '
        });        
    }
}

const getDetallesEnfermedadesId = async (req, res = response) => {
    const deid = req.params.id;
    try {
        const detalleEDB = await DetalleEnfermedad.findById(deid)
         .populate('id_respuesta')
         .populate('id_medico_tratante')
         .populate('id_tipo_condicion')
         
          if(!detalleEDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe detalle de enfermedad por ese ID'
            });
        }
        res.json({
            ok:true,
            detalleEDB
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al '
        });        
    }
}

const crearDetallesEnfermedades = async (req, res = response) => {
    const detalleSalud = new DetalleEnfermedad(req.body);
    try {
        await detalleSalud.save();
        res.json({
            ok:true,
            detalleSalud
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al guardar el registro'
        });        
    }
}

const actualizarDetallesEnfermedades = async (req, res = response) => {
    const deid = req.params.id;
    try {
        const detalleEDB = await DetalleEnfermedad.findById(deid);
        if(!detalleEDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe declaracion por ese ID'
            });
        }        
        //actualizar el registro de ese id en especifico
        const campos = req.body;

        // eliminar campos que no me gustaria actualizar
        delete campos.fecha_creacion;

        //actualizar el detalle como tal
        const edicionDetall = await DetalleEnfermedad.findByIdAndUpdate(deid, campos, {new: true});
        res.json({
            ok:true,
            message: 'Detalle de Enfermedad editada correctamente'
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al Editar ell registro'
        });        
    }
}

const eliminarDetallesEnfermedades = async (req, res = response) => {
    const deid = req.params.id;
    try {
        const detalleEDB = await DetalleEnfermedad.findById(deid) 
        if(!detalleEDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe declaracion por ese ID'
            });
        }
        //eliminar el registro como tal
        await DetalleEnfermedad.findByIdAndDelete(deid)
        res.json({
            ok:true,
            message: 'Registro Eliminado'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al eliminar el registro'
        });        
    }
}


const getDetalleByRespuesta = async (req, res = response) => {
    const idRespuesta = req.params.idRespuesta;  // ⬅️ Coincide con la ruta
    
    try {
        // Buscar por id_declaracion (ObjectId)
        const detalleEDB = await DetalleEnfermedad.find({ 
            id_respuesta: idRespuesta 
        })
         .populate('id_respuesta')
         .populate('id_medico_tratante')
         .populate('id_tipo_condicion')
        
        if(!detalleEDB || detalleEDB.length === 0){
            return res.status(404).json({
                ok: false,
                msg: 'No se encontraron detalles de por respuesta'
            });
        }        
        res.json({
            ok: true,
            detalles: detalleEDB,
            count: detalleEDB.length
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener lso detalles de las respuestas'
        });        
    }
}


module.exports = {
    getDetallesEnfermedades,
    getDetallesEnfermedadesId,    
    crearDetallesEnfermedades, 
    actualizarDetallesEnfermedades,
    eliminarDetallesEnfermedades,
    getDetalleByRespuesta
}