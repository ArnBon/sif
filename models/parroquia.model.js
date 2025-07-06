const { Schema, model } = require('mongoose');

const parroquiaSchema = new Schema({

    id_parroquia: { 
        type: Number, 
        required: true,
        unique: true 
    },

    nombre_parroquia: {
        type: String,
        required: true
    },
    id_municipio: {
        type: Schema.Types.ObjectId,
        ref: 'Municipio',
        required:true,        
    }
        
    });
module.exports = model('Parroquia', parroquiaSchema);