const { response } = require('express');
const RespuestaDeclaracion = require('../../models/respuesta_declaracion.model');
const PreguntaDeclaracion = require('../../models/pregunta_declaracion.model');
const DeclaracionSalud = require('../../models/declaracion_salud.model');


    const getRespuestasDeclaracion = async (req, res = response) => {
        try {
            const respuestaDeclaracion = await RespuestaDeclaracion.find({}, 'id_respuesta id_declaracion id_pregunta respuesta detalles')
            res.json({
                ok:true,
                respuestaDeclaracion
            });            
        } catch (error) {
            console.error(error);
            res.status(500).json({
                ok:false,
                msg: 'Error, comuniquese con el administrador'
            });            
        }
    }

    const getRespuestasDeclaracionId = async (req, res = response) => {
        const rdid = req.params.id;
        try {
            const respuestaDB = await RespuestaDeclaracion.findById(rdid)
            .populate('id_declaracion')
            .populate('id_pregunta')
            if(!respuestaDB){
                return res.status(404).json({
                    ok:false,
                    msg: 'No existe esa pregunta'
                });
            }
              res.json({
                ok:true,
                respuestaDB
            })            
        } catch (error) {
            console.error(error);
            res.status(500).json({
                ok:false,
                msg: 'Error, comuniquese con el administrador'
            });            
        }
    }

    const crearRespuestasDeclaracion = async (req, res = response) => {
        const respuestaDeclaracion = new RespuestaDeclaracion(req.body);
        try {
            await respuestaDeclaracion.save();
            res.json({
                ok:true,
                msg: 'tarea realizada'
            })
            
        } catch (error) {
            console.error(error);
            res.status(500).json({
                ok:false,
                msg: 'Error, comuniquese con el administrador'

            });            
        }
    }

    const actualizarRespuestasDeclaracion = async (req, res = response) => {
        const rdid = req.params.id;
        try {
            const respuestaDB = await RespuestaDeclaracion.findById(rdid)

             if(!respuestaDB){
                return res.status(404).json({
                    ok:false,
                    msg: 'No existe esa pregunta'
                });
            }
             //2.- actualiza el resitro por ese pid        
            const campos = req.body; //son los campos del endpoint | postman
    
            //actualizar la respuesta como tal
            const edicionRespuesta = await RespuestaDeclaracion.findByIdAndUpdate(rdid, campos, {new: true});
            res.json({
                ok:true,
                msg: 'Respuesta actualizada'
            });            
        } catch (error) {
            console.error(error);
            res.status(500).json({
                ok:false,
                msg: 'Error, comuniquese con el administrador'
            });            
        }
    }

    const eliminarRespuestasDeclaracion = async (req, res = response) => {
        const rdid = req.params.id;
        try {
            const respuestaDB = await RespuestaDeclaracion.findById(rdid);
            if(!respuestaDB){
                return res.status(404).json({
                    ok:false,
                    msg: 'No existe esa pregunta'
                });
            }            
            //elimina el registro como tal
            await RespuestaDeclaracion.findByIdAndDelete(rdid)
            res.json({
                ok:true,
                msg: 'tarea realizada'
            })
            
        } catch (error) {
            console.error(error);
            res.status(500).json({
                ok:false,
                msg: 'Error, comuniquese con el administrador'
            });            
        }
    }


    const getRespuestaByDeclaracion = async (req, res = response) => {
    const idDeclaracion = req.params.idDeclaracion;  // ⬅️ Coincide con la ruta
    
    try {
        // Buscar por id_declaracion (ObjectId)
        const respuestasDB = await RespuestaDeclaracion.find({ 
            id_declaracion: idDeclaracion 
        })
        .populate('id_declaracion')  // 
        .populate('id_pregunta');    // 
        
        if(!respuestasDB || respuestasDB.length === 0){
            return res.status(404).json({
                ok: false,
                msg: 'No se encontraron respuestas para esta declaración'
            });
        }        
        res.json({
            ok: true,
            respuestas: respuestasDB,
            count: respuestasDB.length
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener las respuestas de la declaración'
        });        
    }
}




module.exports = {
    getRespuestasDeclaracion,
    getRespuestasDeclaracionId,
    crearRespuestasDeclaracion,
    actualizarRespuestasDeclaracion,
    eliminarRespuestasDeclaracion,
    getRespuestaByDeclaracion
}