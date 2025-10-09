const { Schema, model } = require('mongoose');

const frecuenciaSchema = new Schema({
    desc_frec: {
        type: String,
        required: [true, 'La descripción de frecuencia es obligatoria'],
        unique: true,
        maxlength: 20,
        enum: {
            values: ['Mensual', 'Trimestral', 'Semestral', 'Anual'],
            message: 'Frecuencia inválida. Valores permitidos: Mensual, Trimestral, Semestral, Anual'
        }
    },
    dias_equivalentes: {
        type: Number,
        required: [true, 'Los días equivalentes son obligatorios'],
        min: 1,
        enum: {
            values: [30, 90, 180, 365],
            message: 'Días equivalentes inválidos. Valores permitidos: 30, 90, 180, 365'
        }
    }
}, {
    timestamps: false
});

// Middleware para asignar días automáticamente según la frecuencia
frecuenciaSchema.pre('save', function(next) {
    const diasMap = {
        'Mensual': 30,
        'Trimestral': 90,
        'Semestral': 180,
        'Anual': 365
    };
    
    if (diasMap[this.desc_frec]) {
        this.dias_equivalentes = diasMap[this.desc_frec];
    }
    next();
});

frecuenciaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Frecuencia', frecuenciaSchema);