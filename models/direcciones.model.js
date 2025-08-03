const { Schema, model } = require('mongoose');
const Estado = require('../models/estado.model');
const Ciudad = require('../models/ciudad.model');
const Municipio = require('../models/municipio.model');
const Parroquia = require('../models/parroquia.model');

const direccionSchema = new Schema({
  direccion: {
    type: String,
    required: [true, 'La dirección es obligatoria'],
    trim: true
  },
  cod_postal: {
    type: String,
    validate: {
      validator: function(v) {
        return /^\d{4,5}$/.test(v); // Validación para códigos postales venezolanos
      },
      message: props => `${props.value} no es un código postal válido`
    }
  },
  referencia: {
    type: String,
    trim: true
  },
  tipo: {
    type: String,
    enum: ['casa', 'apartamento', 'oficina', 'otro'],
    default: 'casa'
  },
  id_estado: {
    type: Schema.Types.ObjectId,
    ref: 'Estado',
    required: [true, 'El estado es obligatorio']
  },
  id_ciudad: {
    type: Schema.Types.ObjectId,
    ref: 'Ciudad',
    //required: [true, 'La ciudad es obligatoria']
  },
  id_municipio: {
    type: Schema.Types.ObjectId,
    ref: 'Municipio',
    // required: [true, 'El municipio es obligatorio']
  },
  id_parroquia: {
    type: Schema.Types.ObjectId,
    ref: 'Parroquia',
    // required: [true, 'La parroquia es obligatoria']
  },
  principal: {
    type: Boolean,
    default: false
  }
}, {
  versionKey: false,
  timestamps: true // Opcional: agrega createdAt y updatedAt
});

// Método para transformar el JSON (opcional)
direccionSchema.method('toJSON', function() {
  const { __v, _id, ...object } = this.toObject();
  object.did = _id;
  return object;
});

// En Mongoose no se usa associate. Para la relación con Persona: esta es otra manera de asociarlo a personas 
direccionSchema.virtual('personas', {
  ref: 'Persona', // Modelo relacionado
  localField: '_id', // Campo en este modelo
  foreignField: 'direcciones.direccion', // Campo en el modelo Persona
  justOne: false // Para relación 1:N
});

module.exports = model('Direccion', direccionSchema);