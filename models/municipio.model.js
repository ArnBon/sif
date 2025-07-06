const { Schema, model } = require('mongoose');

const MunicipioSchema = new Schema({
   
    id_municipio: { // <--- ¡Añadir o asegurar que este campo esté aquí!
        type: Number, // Si los IDs son números (como id_estado, id_ciudad)
        required: true,
        unique: true // Generalmente los IDs originales son únicos
    },
   
    nombre_municipio: {
    type: String,
    required: true
},
    id_ciudad: {
    type: Schema.Types.ObjectId,
    ref: 'Ciudad',
    required:true,        
}

}); 

       
module.exports = model('Municipio', MunicipioSchema);