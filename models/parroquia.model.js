const { Schema, model } = require('mongoose');

const parroquiaSchema = new Schema({

        nombre_parroquia: {
            type: String,
            required: true
        },
        id_municipio: {
            type: Schema.Types.ObjectId,
            ref: 'Municipio',
            required:true,        
        },
        cod_postal_p: String
    });
module.exports = model('Parroquia', parroquiaSchema);