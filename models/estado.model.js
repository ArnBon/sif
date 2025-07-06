const { Schema, model } = require('mongoose');

const estadoSchema = new Schema({

    id_estado: { // <--- ¡Añadido este campo!
        type: Number, // Usa Number si tus IDs son números (1, 2, 3...)
        required: true,
        unique: true // Si tus id_estado son únicos, lo cual es lo común
    },

    nombre_estado: {
        type: String,
        required:true,        
    }
    
});


module.exports = model('Estado', estadoSchema);