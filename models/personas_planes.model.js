const { Schema, model } = require('mongoose');

const personaPlaneSchema = Schema({

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

// Índice compuesto para evitar duplicados
personaPlanSchema.index({ id_persona: 1, id_plan: 1 }, { unique: true });

personaPlanSchema.method('toJSON', function(){
    const{ __v, _id, ...object} = this.toObject();
    object.id_persona_plan = _id;
    return object;
});


module.exports = model('PersonasPlanes', personaPlaneSchema);