const { response } = require('express');
const PreguntaDeclaracion = require('../../models/pregunta_declaracion.model');

    const getPreguntasDeclaracion = async (req, res = response) => {
        try {
            // Obtener las preguntas que hay
            const preguntaDeclaracion = await PreguntaDeclaracion.find({}, 'id_pregunta codigo_pregunta texto_pregunta seccion orden activa')
           res.json({
            ok:true,
            declaracion_salud
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
            //2.- actualiza el resitro por ese pid        
            const campos = req.body; //son los campos del endpoint | postman
    
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
                    await PreguntaDeclaracion.findByIdAndDelete
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
    crearPreguntasDeclaracion,
    actualizarPreguntasDeclaracion,
    eliminarPreguntasDeclaracion

}