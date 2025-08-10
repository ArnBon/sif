const { Schema, model } = require('mongoose');



const servicioContratadoSchema = Schema({

    nombre_servicio: {
        type: String,
        required: true
    }

});

module.exports = model(servicioContratadoSchema, servicioContratadoSchema);