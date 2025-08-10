const { Schema, model} = require('mongoose');


const solicitudCoberturaSchema = Schema({


    id_plan: {
        type: Schema.Types.ObjectId,
        ref: 'Planes',
        required: true
    },

    id_persona: {
        type: Schema.Types.ObjectId,
        ref: 'Persona',
        required: true
    },

    seleccionado: {
        type: Boolean,
        default: false
    },

    fecha_seleccion: {
        type: Date,
        default: Date.now
    }

});


module.exports = model('SolicitudCobertura', solicitudCoberturaSchema);