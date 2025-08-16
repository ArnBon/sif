const { Schema, model } = require('mongoose');

const personaServicioSchema = new Schema({
    id_persona: {
        type: Schema.Types.ObjectId,
        ref: 'Persona',
        required: true
    },
    id_servicio: {
        type: Schema.Types.ObjectId,
        ref: 'ServicioContratado',
        required: true
    }
}, {
    timestamps: true
});

// Índice compuesto para evitar duplicados
personaServicioSchema.index({ id_persona: 1, id_servicio: 1 }, { unique: true });

module.exports = model('PersonaServicio', personaServicioSchema);