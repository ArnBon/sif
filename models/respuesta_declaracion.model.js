const {Schema, model} = require('mongoose');
const DeclaracionSalud = require('../models/declaracion_salud.model');
const PreguntaDeclaracion = require('../models/pregunta_declaracion.model');

const respuestaDeclaracionSchema = new Schema({

     id_respuesta: {
        type: Number,
        required: true,
        unique: true

     }, 
    id_declaracion: {
        type: Schema.Types.ObjectId,
        ref: 'DeclaracionSalud',
       // required: true

    }, 
    id_pregunta: {
        type: Schema.Types.ObjectId,
        ref: 'PreguntaDeclaracion',
       // required: true

    }, 
    respuesta: {
        type: String,
        required: true,
        maxlength: 500
    }, 
    detalles: {
        type: String,
        required: true,
        maxlength: 500
    }

});
// Método para transformar el JSON (opcional)
respuestaDeclaracionSchema.method('toJSON', function() {
  const { __v, _idalgo, ...object } = this.toObject();
  object.rdid = _idalgo;
  return object;
});

module.exports = model('RespuestaDeclaracion', respuestaDeclaracionSchema);