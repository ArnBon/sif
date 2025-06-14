const { Schema, model } = require('mongoose');
const Telefono = require('../models/telefono.model');

const personaTelefonoSchema = Schema({
    id_persona: {
        type: Schema.Types.ObjectId,
        ref: 'Persona',
        required: [true, 'El id_persona es obligatorio']
    },
    id_telefono: {
        type: Schema.Types.ObjectId,
        ref: 'Telefono',
        required: [true, 'El id_telefono es obligatorio']
    },
    principal: {
        type: Boolean,
        default: false
    }
});


personaTelefonoSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.did = _id;
    return object;
});

module.exports = model('PersonaTelefono', personaTelefonoSchema);