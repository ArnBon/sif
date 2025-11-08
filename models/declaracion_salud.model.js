const { Schema, model } = require('mongoose');
const Persona = require('../models/personas.model');
const EdoSalud = require('../models/estado_salud.model');
const Usuario = require('../models/usuarios.models');   


const declaracionSaludSchema = new Schema({
    
        id_declaracion:{
            type: Number,
            required: true
        },	
        id_persona: {
            type: Schema.Types.ObjectId,
            ref: 'Persona',
        //  required: true
        },	
        id_edo_salud: {
            type: Schema.Types.ObjectId,
            ref: 'EdoSalud'
        },	    
        fecha_declaracion:{
            type: Date,    
        },	
        observaciones:{
            type: String
        },	
        fecha_creacion:{
            type: Date,
            default: Date.now
        },	
        usuario_creacion:{
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            required: false
        },
    });

// Método para transformar el JSON (opcional)
declaracionSaludSchema.method('toJSON', function() {
  const { __v, _idalgo, ...object } = this.toObject();
  object.dsid = _idalgo;
  return object;
});


module.exports = model('DeclaracionSalud', declaracionSaludSchema);