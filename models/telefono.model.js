const { Schema, model } = require('mongoose');



const telefonoSchema = Schema({

    codigo_pais: {
        type: String
    },

    numero: {
        type:String,
        required: true
    },

    tipo_telefono: {
        type:String
    }

});



telefonoSchema.method('toJSON', function(){

});

module.exports = model('Telefono', telefonoSchema);