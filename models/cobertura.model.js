const { Schema, model } = require('mongoose');

const coberturaSchema = Schema({
    
    nombre: {
        type: String,
        required: true,
        maxlength: 100,
        unique: true
    },
    descripcion: {
        type: String,
        required: true,
        maxlength: 500
    },
    requiere_servicios: {
        type: Boolean,
        default: false
    }
})




module.exports = model('Cobertura', coberturaSchema);