// models/EstadoCivil.js
const { Schema, model } = require('mongoose');

const estadoCivilSchema = new Schema({
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    unique: true
  },
  codigo: {
    type: String,
    required: [true, 'El código es obligatorio'],
    uppercase: true,
    enum: ['S', 'C', 'V', 'D'], // Soltero, Casado, Viudo, Divorciado
    unique: true
  }
}, {
  versionKey: false,
  timestamps: false
});

estadoCivilSchema.method('toJSON', function() {
  const { _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('EstadoCivil', estadoCivilSchema);