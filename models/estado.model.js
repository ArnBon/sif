const { Schema, model } = require('mongoose');

const estadoSchema = new Schema({

    nombre_estado: {
        type: String,
        required:true,        
    },
    cod_postal_e:String

});


module.exports = model('Estado', estadoSchema);