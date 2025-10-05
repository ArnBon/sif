const { Schema, model } = require('mongoose');
const Persona = require('../models/persona.model');
const DeclaracionSalud = require('../models/declaracion_salud.model');

const estadoSaludSchema = new Schema({

    id_estado_salud: {
        type: Number,
        required: true, 
        unique: true
    },

    id_declaracion: {
        type: Schema.Types.ObjectId,
        ref: 'DeclaracionSalud',
       // required: true
    },

    id_persona: {
        type: Schema.Types.ObjectId,
        ref: 'Persona',
       // required: true
    },

    en_buena_salud: {
        type: Boolean
    },

    detalles_negativos: {
        type: String        
    },

    observaciones: {
        type: String
    },

    fecha_evaluacion: {
        type: Date
    }
});

// Método para transformar el JSON (opcional)
estadoSaludSchema.method('toJSON', function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('EdoSalud', estadoSaludSchema);