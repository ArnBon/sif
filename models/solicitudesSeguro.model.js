const {Schema, model} = require('mongoose');


const solicitudSeguroSchema = new Schema({

id_solicitud_seg: {
        type: Number,
        required: true,
        unique: true
    },
    id_persona: {
        type: Schema.Types.ObjectId,
        ref: 'Persona',
        required: true
    },
    tipo_seguro: {
        type: String,
        required: true
    },
    fecha_solicitud: {
        type: Date,
        default: Date.now
    },
    estado_solicitud: {
        type: String,
        required: true
    }

});

// Método para transformar el _id a id y eliminar campos internos
solicitudSeguroSchema.method('toJSON', function() {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});





module.exports = model('SolicitudSeguro', solicitudSeguroSchema);