const {Schema, model} = require('mongoose');

const tipoIntervencionSchema = new Schema({

    id_tipo_intervencion: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
        maxlength: 100
    },
    descripcion: {
        type: String,
        required: true,
        maxlength: 300
    }

});
// Método para transformar el JSON (opcional)
tipoIntervencionSchema.method('toJSON', function() {
  const { __v, _id, ...object } = this.toObject();
  object.tiid = _id;
  return object;
});

module.exports = model('TipoIntervencion', tipoIntervencionSchema); 