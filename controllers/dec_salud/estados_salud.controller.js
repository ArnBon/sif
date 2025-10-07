const { response } = require('express');
const EdoSalud = require('../../models/estado_salud.model');
const Persona = require('../../models/personas.model');
const DeclaracionSalud = require('../../models/declaracion_salud.model');


const getEstadosSalud = async (req, res = response) => {
    try {
        const edo_salud = await EdoSalud.find({}, 'id_estado_salud id_declaracion id_persona en_buena_salud detalles_negativos observaciones fecha_evaluacion')

        res.json({
            ok:true,
            edo_salud
        });        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al encontrar Estados de Salud'
        });        
    }
} 

const getEstadosSaludId = async (req, res = response) => {
    const esid = req.params.id;
    try {
        const edoSaludDB = await EdoSalud.findById(esid)
        .populate('id_declaracion')
        .populate('id_persona')

        if(!edoSaludDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe registro por ese ID'
            })

        }
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

const crearEstadosSalud = async (req, res = response) => {
    const edo_salud = new EdoSalud(req.body);
    try {
        await edo_salud.save();
        res.json({
            ok:true,
            msg: 'Estado de Salud crea'
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al encontrar declaraciones'
        });        
    }
}

const actualizarEstadosSalud = async (req, res = response) => {
    const esid = req.params.id;
    try {
        const edoSaludDB = await EdoSalud.findById(esid);
        if(!edoSaludDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe registro por ese ID'
            });
        }
        const campos = req.body;

        const edicionEstadoSalud = await EdoSalud.findByIdAndUpdate(esid, campos, {new: true})


        res.json({
            ok:true,
            msg: 'registro actualizado satisfactoriamente'
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al encontrar declaraciones'
        });        
    }
}

const eliminarEstadosSalud = async (req, res = response) => {
    const esid = req.params.id;
    try {
        const edoSaludDB = await EdoSalud.findById(esid);
        if(!edoSaludDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe registro por ese ID'
            });
        }
        //elimina el registro como tal
        await EdoSalud.findByIdAndDelete  
        res.json({
            ok:true,
            msg: 'Registro eliminado'
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
    getEstadosSalud,
    getEstadosSaludId,
    crearEstadosSalud,
    actualizarEstadosSalud,
    eliminarEstadosSalud
}