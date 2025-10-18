const { response } = require('express');
const PreguntaDeclaracion = require('../../models/pregunta_declaracion.model');

    const getPreguntasDeclaracion = async (req, res = response) => {
        try {
            // Obtener las preguntas que hay
            const preguntaDeclaracion = await PreguntaDeclaracion.find({}, 'id_pregunta codigo_pregunta texto_pregunta seccion orden activa')
           res.json({
            ok:true,
            preguntaDeclaracion
        }); 
        } catch (error) {
            console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al encontrar declaraciones'
        });
        }
    }

    const getPreguntasDeclaracionId = async (req, res = response) => {
        const pdid = req.params.id;
        try {
            const preguntaDB = await PreguntaDeclaracion.findById(pdid)
            .populate('id_pregunta')

            if(!preguntaDB){
                return res.status(404).json({
                    ok:false,
                    msg: 'No existe esa pregunta'
                });
            }
            res.json({
            ok:true,
            preguntaDB
        });
        } catch (error) {
            console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al encontrar preguntas'
        });
        }
    }

   
const getPreguntasActivas = async (req, res = response) => {
    try {
        const preguntas = await PreguntaDeclaracion.find({ activa: true }).sort({ orden: 1 });
        
        res.json({
            ok: true,
            msg: 'Preguntas activas obtenidas correctamente',
            data: preguntas,
            total: preguntas.length
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener preguntas activas'
        });
    }
}

const getPreguntasInactivas = async (req, res = response) => {
    try {
        const preguntas = await PreguntaDeclaracion.find({ activa: false }).sort({ orden: 1 });
        
        res.json({
            ok: true,
            msg: 'Preguntas inactivas obtenidas correctamente',
            data: preguntas,
            total: preguntas.length
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener preguntas inactivas'
        });
    }
}

    const crearPreguntasDeclaracion = async (req, res = response) => {
        const preguntaDeclaracion = new PreguntaDeclaracion(req.body);
        try {
            await preguntaDeclaracion.save();
          res.json({
            ok:true,
            msg: 'Pregunta creada satisfactoriamente'
        });  
        } catch (error) {
            console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al crear preguntas'
        });
        }
    }

    const actualizarPreguntasDeclaracion = async (req, res = response) => {
        const pdid = req.params.id;
        try {
            const preguntaDB = await PreguntaDeclaracion.findById(pdid);
            if(!preguntaDB){
                return res.status(404).json({
                    ok:false,
                    msg: 'No existe esa pregunta'
                });
            }
            //2.- actualiza el registro por ese pid        
            const campos = req.body; //son los campos del endpoint | postman

            //eliminar campos que no quiero actualizar
            delete campos.id_pregunta;
    
            //actualizar la pregunta como tal
            const edicionPregunta = await PreguntaDeclaracion.findByIdAndUpdate(pdid, campos, {new: true});
          res.json({
            ok:true,
            msg: 'Pregunta actualizada correctamente'
        });  
        } catch (error) {
            console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al encontrar declaraciones'
        });
        }

    }

    const activarPreguntaDeclaracion = async (req, res = response) => {
    const pdid = req.params.id;
    try {
        const preguntaDB = await PreguntaDeclaracion.findById(pdid);
        if(!preguntaDB){
            return res.status(404).json({
                ok:false,
                msg: 'No existe esa pregunta'
            });
        }
        
        // Actualizar solo el campo activa a true
        const preguntaActualizada = await PreguntaDeclaracion.findByIdAndUpdate(
            pdid, 
            { 
                activa: true,
                fecha_modificacion: new Date(),
                usuario_modificacion: req.body.usuario_modificacion || 'sistema'
            }, 
            { new: true }
        );
        
        res.json({
            ok:true,
            msg: 'Pregunta activada correctamente',
            data: preguntaActualizada
        });  
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al activar la pregunta'
        });
    }
}


const desactivarPreguntaDeclaracion = async (req, res = response) => {
    const pdid = req.params.id;
    try {
        const preguntaDB = await PreguntaDeclaracion.findById(pdid);
        if(!preguntaDB){
            return res.status(404).json({
                ok:false,
                msg: 'No existe esa pregunta'
            });
        }
        
        // Actualizar solo el campo activa a false
        const preguntaActualizada = await PreguntaDeclaracion.findByIdAndUpdate(
            pdid, 
            { 
                activa: false,
                fecha_modificacion: new Date(),
                usuario_modificacion: req.body.usuario_modificacion || 'sistema'
            }, 
            { new: true }
        );
        
        res.json({
            ok:true,
            msg: 'Pregunta desactivada correctamente',
            data: preguntaActualizada
        });  
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al desactivar la pregunta'
        });
    }
}
    const eliminarPreguntasDeclaracion = async (req, res = response) => {
        const pdid = req.params.id;
        try {
            const preguntaDB = await PreguntaDeclaracion.findById(pdid);
            if(!preguntaDB){
                return res.status(404).json({
                    ok:false,
                    msg: 'No existe esa pregunta'
                });
            }
             //elimina el registro como tal
                    await PreguntaDeclaracion.findByIdAndDelete(pdid)
          res.json({
            ok:true,
            msg: 'Registro eliminado...'
        });  
        } catch (error) {
            console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al encontrar declaraciones'
        });
        }
    }


module.exports = {
    getPreguntasDeclaracion,
    getPreguntasDeclaracionId,
    getPreguntasActivas,
    getPreguntasInactivas,
    crearPreguntasDeclaracion,
    actualizarPreguntasDeclaracion,
    activarPreguntaDeclaracion,
    desactivarPreguntaDeclaracion,
    eliminarPreguntasDeclaracion
}