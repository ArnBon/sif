const { Schema, model } = require('mongoose');

const monedaSchema = new Schema({
    cod_moneda: {
        type: String,
        required: [true, 'El código de moneda es obligatorio'],
        unique: true,
        uppercase: true,
        maxlength: 3,
        enum: {
            values: ['USD', 'EUR', 'VES'],
            message: 'Código de moneda inválido. Valores permitidos: USD, EUR, VES'
        }
    },
    sim_moneda: {
        type: String,
        required: [true, 'El símbolo de moneda es obligatorio'],
        maxlength: 3,
        enum: {
            values: ['$', '€', 'Bs'],
            message: 'Símbolo de moneda inválido. Valores permitidos: $, €, Bs'
        }
    },
    desc_moneda: {
        type: String,
        required: [true, 'La descripción de moneda es obligatoria'],
        maxlength: 20,
        enum: {
            values: ['Dólar Americano', 'Euro', 'Bolívar'],
            message: 'Descripción de moneda inválida'
        }
    }
}, {
    timestamps: false
});

// Middleware para asegurar consistencia entre campos
monedaSchema.pre('save', function(next) {
    const monedaMap = {
        'USD': { simbolo: '$', descripcion: 'Dólar Americano' },
        'EUR': { simbolo: '€', descripcion: 'Euro' },
        'VES': { simbolo: 'Bs', descripcion: 'Bolívar' }
    };
    
    if (monedaMap[this.cod_moneda]) {
        this.sim_moneda = monedaMap[this.cod_moneda].simbolo;
        this.desc_moneda = monedaMap[this.cod_moneda].descripcion;
    }
    next();
});

monedaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Moneda', monedaSchema);