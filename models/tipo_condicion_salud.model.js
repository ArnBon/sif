 const {Schema, model} = require('mongoose');

const tipoCondicionSaludSchema = new Schema({

    id_tipo_condicion:{
        type: Number,
        required: true,
        unique: true
    },
    nombre:{
        type: String,
        maxlength: 100

    },
    descripcion:{
        type: String,
        maxlength: 300
    }

});
// Método para transformar el JSON (opcional)
tipoCondicionSaludSchema.method('toJSON', function() {
  const { __v, _idalgo, ...object } = this.toObject();
  object.tcsid = _idalgo;
  return object;
});

module.exports = model('TipoCondicionSalud', tipoCondicionSaludSchema);