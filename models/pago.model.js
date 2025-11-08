const { Schema, model } = require('mongoose');



const pagoSchema = new Schema({
   id_persona: {
        type: Schema.Types.ObjectId,
        ref: 'Persona',
        required: true
    },
    id_frecuencia: {
        type: Schema.Types.ObjectId,
        ref: 'Frecuencia',
        required: true
    },
    id_moneda: {
        type: Schema.Types.ObjectId,
        ref: 'Moneda',
        required: true
    },
    id_forma_pago: {
        type: Schema.Types.ObjectId,
        ref: 'FormaPago',
        required: true
    },
    id_banco: {
        type: Schema.Types.ObjectId,
        ref: 'Banco'
        // No es required porque algunas formas de pago no requieren banco
    },
    id_tipo_cuenta: {
        type: Schema.Types.ObjectId,
        ref: 'TipoCuenta'
        // No es required porque algunas formas de pago no requieren cuenta
    },
    num_cta: {
        type: String,
        maxlength: 20,
        validate: {
            validator: function(v) {
                // Solo validar si id_banco está presente
                if (this.id_banco) {
                    return v && v.length > 0;
                }
                return true;
            },
            message: 'El número de cuenta es requerido cuando se selecciona un banco'
        }
    },
    num_tarjeta: {
        type: String,
        maxlength: 20
    },
    fecha_pago: {
        type: Date,
        required: true
    },
    usuario_creacion: {
        type: String,
       // required: [true, 'El usuario de creación es obligatorio']
    },
    usuario_actualizacion: {
        type: String
    }
}, {
    timestamps: { 
        createdAt: 'fecha_creacion', 
        updatedAt: 'fecha_actualizacion' 
    }
});


// Método para transformar el _id a id y eliminar campos internos
pagoSchema.method('toJSON', function() {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

// En Mongoose las relaciones se manejan con populate, no con associate
// Las relaciones N:M se gestionan a través de los modelos separados

module.exports = model('Pago', pagoSchema);