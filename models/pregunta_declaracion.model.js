const {Schema, model} = require('mongoose');


const preguntaDeclaracionSchema = new Schema({
    id_pregunta: {
        type: Number,
        required: true,
        unique: true
    }, 
    codigo_pregunta: {
        type: String,
        maxlength: 100
    }, 
    texto_pregunta: {
        type: String,
        maxlength: 300
    }, 
    seccion: {
        type: String,
        maxlength: 100
    },
    orden: {
        type: String,
        maxlength: 100
    }, 
    activa: {
        type: Boolean
    }, 

});
// Método para transformar el JSON (opcional)
preguntaDeclaracionSchema.method('toJSON', function() {
  const { __v, _idalgo, ...object } = this.toObject();
  object.did = _idalgo;
  return object;
});


module.exports = model('PreguntaDeclaracion', preguntaDeclaracionSchema);