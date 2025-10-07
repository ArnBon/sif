const { response } = require ('express');
const IntervencionConsulta = require('../../models/intervencion_consulta.model');
const Persona = require('../../models/personas.model');
const RespuestaDeclaracion = require('../../models/respuesta_declaracion.model');


    const getIntervencionesConsultas = async (req, res = response) => {
        try {
            const intervencion_consulta = await IntervencionConsulta.find({}, 'id_intervencion id_respuesta id_tipo_intervencion id_medico descripcion fecha_evento fecha_recomendacion institucion motivo diagnostico examenes tratamiento observaciones')
            res.json({
                ok:true,
                intervencion_consulta
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                ok:false,
                intervencion_consulta
            });
        } 
    }

    const getIntervencionesConsultasId = async (req, res = response) => {
        const icid = req.params.id
        try {
            const intervencionDB = await IntervencionConsulta.findById(icid)
            .populate('id_respuesta')
            .populate('id_tipo_intervencion')
            .populate('id_medico')           
            
            if(!intervencionDB){
            return res.status(404).json({
                ok:false,
                intervencionDB                
            });
        }
            res.json({
                ok:true,
                intervencionDB
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                ok:false,
                msg: 'No existe registro con este ID'
            });
        } 
    }

    const crearIntervencionesConsultas = async (req, res = response) => {
        const intervencionConsulta = new IntervencionConsulta(req.body)
        try {
            await intervencionConsulta.save();
            res.json({
                ok:true,
                msg: 'Intervencion consulta creada satisfactoriamente'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                ok:false,
                msg: 'Error al intentar crear el registro'
            });
        } 
    }

    const actualizarIntervencionesConsultas = async (req, res = response) => {
        const icid = req.params.id
        try {
            const intervencionDB = await IntervencionConsulta.findById(icid)

            if(!intervencionDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe declaracion por ese ID'
            });
        }
        //2.- actualiza el resitro por ese pid        
                const campos = req.body; //son los campos del endpoint | postman
        
                //eliminar campos que no quiero actualizar
                //delete campos.examenes;
        
                //actualizar la declaracion como tal
                const intervencionConsulta = await IntervencionConsulta.findByIdAndUpdate(icid, campos, {new: true});
                 
            res.json({
                ok:true,
                msg: 'registro actualizado correctamente'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                ok:false,
                msg: 'Error al intentar actualizar registro'
            });
        } 
    }

    const eliminarIntervencionesConsultas = async (req, res = response) => {
        const icid = req.params.id
        try {
            const intervencionDB = await IntervencionConsulta.findById(icid)
            if(!intervencionDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe declaracion por ese ID'
            });
        }
         //elimina el registro como tal
                await IntervencionConsulta.findByIdAndDelete 
            res.json({
                ok:true,
                msg: 'Registro eliminado'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                ok:false,
                msg: 'Error al intentar eliminar registro'
            });
        } 
    }
module.exports = {
    getIntervencionesConsultas,
    getIntervencionesConsultasId,
    crearIntervencionesConsultas,
    actualizarIntervencionesConsultas,
    eliminarIntervencionesConsultas
}