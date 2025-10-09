const { Schema, model } = require('mongoose');

const tipoCuentaSchema = new Schema({
    desc_tipo_cuenta: {
        type: String,
        required: [true, 'La descripción del tipo de cuenta es obligatoria'],
        unique: true,
        maxlength: 30,
        enum: {
            values: ['Corriente', 'Ahorro', 'Tarjeta de Crédito'],
            message: 'Tipo de cuenta inválido. Valores permitidos: Corriente, Ahorro, Tarjeta de Crédito'
        }
    },
    cod_tipo: {
        type: String,
        required: [true, 'El código del tipo de cuenta es obligatorio'],
        unique: true,
        uppercase: true,
        maxlength: 3,
        enum: {
            values: ['CC', 'AH', 'TDC'],
            message: 'Código de tipo de cuenta inválido. Valores permitidos: CC, AH, TDC'
        }
    }
}, {
    timestamps: false
});

// Middleware para asignar código automáticamente
tipoCuentaSchema.pre('save', function(next) {
    const codigoMap = {
        'Corriente': 'CC',
        'Ahorro': 'AH', 
        'Tarjeta de Crédito': 'TDC'
    };
    
    if (codigoMap[this.desc_tipo_cuenta]) {
        this.cod_tipo = codigoMap[this.desc_tipo_cuenta];
    }
    next();
});

tipoCuentaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('TipoCuenta', tipoCuentaSchema);