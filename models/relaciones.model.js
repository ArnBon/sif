const { Schema, model} = require('mongoose');


const relacionSchema = new Schema({
 
id_relacion: {
        type: Number,
        required: true,
        unique: true
    },
     id_persona_titular: {
        type: Schema.Types.ObjectId,
        ref: 'Persona',
        required: true
    },
    id_persona_familiar: {
        type: Schema.Types.ObjectId,
        ref: 'Persona',
        required: true
    },
    parentesco: {
        type: String,
        required: true
    }

});


// Método para transformar el _id a id y eliminar campos internos
relacionSchema.method('toJSON', function() {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Relacion', relacionSchema);