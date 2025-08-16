const { Schema, model } = require('mongoose');



const servicioContratadoSchema = Schema({

    nombre_servicio: {
        type: String,
        required: true,
        maxlength: 100,
        unique: true
    }

});

servicioContratadoSchema.method('toJSON', function(){
    const{ __v, _id, ...object} = this.toObject();
    object.id_servicio = _id;
    return object;
});

module.exports = model('ServicioContratado', servicioContratadoSchema);