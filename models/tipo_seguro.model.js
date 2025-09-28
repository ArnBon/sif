const { Schema, model} = require('mongoose');


const tipoSeguroSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre del tipo de seguro es obligatorio'],
        unique: true,
        maxlength: 150
    },

    codigo: {
        type: String,
        required: [true, 'El código es obligatorio'],
        unique: true,
        maxlength: 10,
        uppercase: true
    },

    descripcion: {
        type: String,
        maxlength: 500
    },
}, {
    timestamps: {
        createdAt: 'fecha_creacion',
        updatedAt: 'fecha_actualizacion'
    }
});

tipoSeguroSchema.method('toJSON', function(){
    const{ __v, _id, ...object} = this.toObject();
    object.id_tipo_seguro = _id;
    return object;
});


module.exports = model('TipoSeguro', tipoSeguroSchema);