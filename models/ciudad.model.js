const { Schema, model } = require('mongoose');

const ciudadSchema = new Schema({

    id_ciudad: { // <--- ¡Añadido este campo! (Para que los municipios puedan referenciar)
        type: Number, // Usa Number si tus IDs son números
        required: true,
        unique: true
    },

    nombre_ciudad: {
        type: String,
        required: true
    },
    id_estado: {
        type: Schema.Types.ObjectId,
        ref: 'Estado',
        required:true,        
    } 
});

module.exports = model('Ciudad', ciudadSchema);