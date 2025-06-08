const { Schema, model } = require('mongoose');

const ciudadSchema = new Schema({

    nombre_ciudad: {
        type: String,
        required: true
    },
    id_estado: {
        type: Schema.Types.ObjectId,
        ref: 'Estado',
        required:true,        
    },
    cod_postal_c: String
});

module.exports = model('Ciudad', ciudadSchema);