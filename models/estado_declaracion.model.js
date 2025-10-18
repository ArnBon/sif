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
        uppercase: true,
       enum: ['BORRADOR', 'COMPLETA', 'VERIFICADA', 'RECHAZADA'],
    },

    descripcion:
    {
        type: String,
        required: true,
        enum: ['Declaración en proceso de llenado', 'Declaración finalizada por el cliente', 'Declaración aprobada por médico', 'Declaración rechazada por condiciones de salud'],
        
    },
});

// Método para transformar el JSON (opcional)
estadoDeclaracionSchema.method('toJSON', function() {
  const { __v, _idalgo, ...object } = this.toObject();
  object.did = _idalgo;
  return object;
});
module.exports = model('EstadoDeclaracion', estadoDeclaracionSchema);