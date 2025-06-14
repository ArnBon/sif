const { Schema, model } = require('mongoose');
const Persona = require('../models/personas.model');

const datosLaboralesSchema = Schema({
    
    profesion: {
        type:String,
    }, 
    ocupacion: {
        type:String,
    }, 
    actividad_economica: {
        type:String,
    },   
    ingreso_anual: {
        type:String,
    }, 
    empresa_trabaja: {
        type:String,
    },
	fecha_ingreso: {
        type:String,
    },
    id_persona: {
        type: Schema.Types.ObjectId,
        ref: Persona,
        required: true
    }
});
module.exports = model('DatosLaborales', datosLaboralesSchema);