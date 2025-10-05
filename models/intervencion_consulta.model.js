const { Schema, model } = require('mongoose');
const Persona = require('../models/persona.model');
const TipoIntervencion = require();
const RespuestaDeclaracion = require();


const intervencionConsultaSchema = new Schema ({

    id_intervencion: {
        type: Number,
        required: true, 
        unique: true       
    }, 
    id_respuesta: {
        type: Schema.Types.ObjectId,
        ref: 'RespuestaDeclaracion'
    }, 
    id_tipo_intervencion: {
        type: Schema.Types.ObjectId,
        ref: 'TipoIntervencion'
    },
    id_medico: {
        type: Schema.Types.ObjectId,
        ref: 'Persona'
    }, 
    descripcion: {
        type: String,
        maxlength: 300 
    }, 
    fecha_evento: {
        type: Date 
    }, 
    fecha_recomendacion: {
        type: Date
    },     
    institucion: {
        type: String,
        maxlength: 150 
    }, 
    motivo: {
        type: String,
        maxlength: 300 
    }, 
    diagnostico: {
        type: String,
        maxlength: 300 
    }, 
    examenes: {
        type: String,
        maxlength: 300 
    },
    tratamiento: {
        type: String,
        maxlength: 300
    },
    observaciones: {
        type: String,
        maxlength: 300
    }
});

// Método para transformar el JSON (opcional)
declaracionSaludSchema.method('toJSON', function() {
  const { __v, _idalgo, ...object } = this.toObject();
  object.did = _idalgo;
  return object;
});


    module.exports = model('IntervencionConsulta', intervencionConsultaSchema )