const { Schema, model } = require('mongoose');
const Persona = require('../models/personas.model');
const TipoCondicionSalud = require('../models/tipo_condicion_salud.model');
const RespuestaDeclaracion = require('../models/respuesta_declaracion.model');

const detalleEnfermedadSchema = new Schema({

    id_detalle:{
        type: Number,
        required: true
    },
    id_respuesta:{
        type: Schema.Types.ObjectId,
        ref: 'RespuestaDeclaracion',
       // required: true
    },
    id_medico_tratante:{
        type: Schema.Types.ObjectId,
        ref: 'Persona',
        //required: true
    },
    id_tipo_condicion:{
        type: Schema.Types.ObjectId,
        ref: 'TipoCondicionSalud',
        //required: true
    },
    descripcion:{
        type: String,
        maxlength: 500
    },
    fecha_comienzo:{
        type: Date,
    },
    fecha_fin:{
        type: Date,
    },
    institucion_tratante:{
        type: String,
        maxlength: 50
    },
    examenes_practicados:{
        type: String,
        maxlength: 500
    },
    tratamiento:{
        type: String,
        maxlength: 500
    },
    estado_actual:{
        type: String,
        maxlength: 100
    },
    tiene_secuelas:{
        type: Boolean,
    },
    descripcion_secuelas:{
        type: String,
        maxlength: 500
    },
    fecha_creacion:{
        type: Date,
        default: Date.now
    }
    
});

// Método para transformar el JSON (opcional)
detalleEnfermedadSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.deid = _id;
    return object;
});

module.exports = model('DetalleEnfermedad', detalleEnfermedadSchema);