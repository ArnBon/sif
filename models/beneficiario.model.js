const {Schema, model} = require('mongoose');


const beneficiarioSchema = new Schema({

id_beneficiario: {
        type: Number,
        required: true,
        unique: true
    },
     id_persona: {
         type: Schema.Types.ObjectId,
        ref: 'Persona',
        required: true
    },
    porc_participacion: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    }

});

// Método para transformar el _id a id y eliminar campos internos
beneficiarioSchema.method('toJSON', function() {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});


module.exports = model('Beneficiario', beneficiarioSchema);    