const { Schema, model } = require('mongoose');

const personasPlanesSchema = Schema({

    id_persona: {
        type: Schema.Types.ObjectId,
        ref: 'Persona',
        required: true
    },

    id_plan: {
        type: Schema.Types.ObjectId,
        ref: 'Planes',
        required: true
    },

    id_tipo_seguro: {
        type: Schema.Types.ObjectId,
        ref: 'TipoSeguro',
        required: true
    },

    fecha_solicitud: {
        type: Date,
        required: true
    },

    es_individual: {
        type: Boolean,
        required: true
    }

});


module.exports = model(personasPlanesSchema, personasPlanesSchema);