// models/Genero.js
const { Schema, model } = require('mongoose');

const generoSchema = new Schema({
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    unique: true
  },
  codigo: {
    type: String,
    required: [true, 'El código es obligatorio'],
    uppercase: true,
    enum: ['M', 'F', 'O'], // Masculino, Femenino, Otro
    unique: true
  }
}, {
  versionKey: false,
  timestamps: false
});

// Transformación del _id
generoSchema.method('toJSON', function() {
  const { _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('Genero', generoSchema);