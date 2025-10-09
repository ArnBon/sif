const { Schema, model } = require('mongoose');


const bancoSchema = new Schema({
    cod_banco: {
        type: String,
        required: [true, 'El código del banco es obligatorio'],
        unique: true,
        maxlength: 10
    },
    nombre_banco: {
        type: String,
        required: [true, 'El nombre del banco es obligatorio'],
        unique: true,
        maxlength: 50
    },
    pais_banco: {
        type: String,
        default: 'Venezuela',
        maxlength: 30
    },
    activo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true // Crea automáticamente createdAt y updatedAt
});


// Método para transformar el _id a id y eliminar campos internos
bancoSchema.method('toJSON', function() {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

// En Mongoose las relaciones se manejan con populate, no con associate
// Las relaciones N:M se gestionan a través de los modelos separados

module.exports = model('Banco', bancoSchema);