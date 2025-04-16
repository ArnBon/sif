const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({    
    nombre_usuario: {
        type: String,
        unique: true
    },

    contrasena: {
        type: String
    },

    email: {
        type: String,
        unique: true
    }, 

    fecha_creacion: {
        type: Date, 
        default: Date.now
    }, 

    estatus: {
        type: String,
        enum: ['Activo','Inactivo'],
        default:['Activo'] 
    },

    id_persona: {
        type: Schema.Types.ObjectId,
        ref: 'Persona'
    },    
});

usuarioSchema.method('toJson', function(){
    const{ __v, _id, contrasena, ...object} = this.toObject();
    object.id_usuario = _id;
    return object;
});


module.exports = model('Usuario', usuarioSchema);