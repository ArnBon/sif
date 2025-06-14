// models/TipoPersona.js
const { Schema, model } = require('mongoose');

const tipoPersonaSchema = new Schema({
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    unique: true
  },
  codigo: {
    type: String,
    required: [true, 'El código es obligatorio'],
    uppercase: true,
    enum: ['B', 'F', 'M', 'D', 'T'], // Beneficiario, Familiar, Médico, Dependiente, Titular
    unique: true
  }
}, {
  versionKey: false,
  timestamps: false
});

tipoPersonaSchema.method('toJSON', function() {
  const { _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('TipoPersona', tipoPersonaSchema, 'tbl_tipo_persona');