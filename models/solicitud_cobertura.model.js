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
    id_plan_cobertura: {
        type: Schema.Types.ObjectId,
        ref: 'PlanCobertura',
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
solicitudCoberturaSchema.method('toJSON', function(){
    const{ __v, _id, ...object} = this.toObject();
    object.id_solicitud = _id;
    return object;
});


module.exports = model('SolicitudCobertura', solicitudCoberturaSchema);