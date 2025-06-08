const { Schema, model } = require('mongoose');

const municipioSchema = new Schema({

        nombre_municipio: {
            type: String,
            required: true
        },
        id_ciudad: {
            type: Schema.Types.ObjectId,
            ref: 'Ciudad',
            required:true,        
        },
        cod_postal_m: String
    });
module.exports = model('Municipio', municipioSchema);