const { Schema, model } = require('mongoose');

const planesSchema = Schema({

    nombre_plan: {
        type: String,
        required: true
    },

    suma_asegurada: {
        type: Number,
        required: true
    } 

});

module.exports = model('Planes', planesSchema);