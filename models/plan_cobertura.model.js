const { Schema, model } = require('mongoose');

const planCoberturaSchema = new Schema({
    id_plan: {
        type: Schema.Types.ObjectId,
        ref: 'Plan',
        required: true
    },
    id_cobertura: {
        type: Schema.Types.ObjectId,
        ref: 'Cobertura',
        required: true
    },
    activo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Índice compuesto para evitar duplicados
planCoberturaSchema.index({ id_plan: 1, id_cobertura: 1 }, { unique: true });

module.exports = model('PlanCobertura', planCoberturaSchema);