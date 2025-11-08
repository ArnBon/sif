const { Schema, model } = require('mongoose');


const formaPagoSchema = new Schema({

    desc_forma_pago: {
        type: String,
        required: [true, 'La descripción de la forma de pago es obligatoria'],        
        maxlength: 30
    },
    requiere_cuenta: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});


// Método para transformar el _id a id y eliminar campos internos
formaPagoSchema.method('toJSON', function() {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

// En Mongoose las relaciones se manejan con populate, no con associate
// Las relaciones N:M se gestionan a través de los modelos separados

module.exports = model('FormaPago', formaPagoSchema);