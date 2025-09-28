const { Schema, model } = require('mongoose');

const dependenciaSchema = new Schema({
    
	 id_dependiente: {
        type: Number,
        required: true,
        unique: true
    },
    id_persona: {
         type: Schema.Types.ObjectId,
        ref: 'Persona',
        required: true
    }

});


// Método para transformar el _id a id y eliminar campos internos
dependenciaSchema.method('toJSON', function() {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Dependiente', dependenciaSchema);