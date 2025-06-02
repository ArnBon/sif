const { Schema, model } = require('mongoose');


const personaSchema = Schema({
    id_persona: {
        type: String
    },

    id_genero: {
        type: String
    },

    id_tipo_persona: {
        type: String
    },

    id_edo_civil: {
        type: String
    },

    primer_apellido: {
        type: String,
        required: true
    },

    segundo_apellido: {
    type: String
    },

    primer_nombre: {
    type: String,
    required: true
    },

    segundo_nombre: {
    type: String
    },

    fecha_nac: {
    type: Date
    },

    tipo_identificacion: {
        type: String
    }, // 'V', 'E' 

    cedula: {
        type: String,
        required: true
    }, 
    pasaporte: {
        type: String
    }, 
    rif: {
        type: String
    }, 
    email: {
        type: String
    },
    foto_url: {
        type: String
    }, 
    activo: {
        type: String
    }, 
    fecha_creacion: {
        type: String
    }, 
    fecha_actualizacion: {
        type: String
    },
});

personaSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.pid = _id;
    return object;
});

module.exports = model('Persona', personaSchema);