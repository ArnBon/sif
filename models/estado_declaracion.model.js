const {Schema, model} = require('mongoose');


const estadoDeclaracionSchema = new Schema({

    id_edo_declaracion:
    {
        type: Number,
        required: true,
        unique: true
    },
    nombre:
    {
        type: String,
        required: true,
        maxlength: 100
    },

    descripcion:
    {
        type: String,
        required: true,
        maxlength: 500
    },
});

// Método para transformar el JSON (opcional)
estadoDeclaracionSchema.method('toJSON', function() {
  const { __v, _idalgo, ...object } = this.toObject();
  object.did = _idalgo;
  return object;
});
module.exports = model('EstadoDeclaracion', estadoDeclaracionSchema);