const { Schema, model } = require('mongoose');

const telefonoSchema = new Schema({
  codigo_pais: {
    type: String,
    default: "+58",
    validate: {
      validator: function(v) {
        return /^\+58$/.test(v);
      },
      message: props => `Solo se permiten números venezolanos (+58)`
    }
  },
  numero: {
    type: String,
    required: [true, 'El número es obligatorio'],
    unique: true, // Evita duplicados
    validate: {
      validator: function(v) {
        // Valida formatos: 04121234567, 02121234567, 4121234567
        return /^(0?4(12|14|16|24|26)|0?212)\d{7}$/.test(v);
      },
      message: props => `${props.value} no es un número válido en Venezuela!`
    }
  },
  tipo_telefono: {
    type: String,
    enum: ['movil', 'fijo', 'familia', 'trabajo', 'emergencia'],
    required: [true, 'El tipo de teléfono es obligatorio']
  },
  operadora: {
    type: String,
    enum: ['movistar', 'digitel', 'movilnet', 'cantv', null],
    default: function() {
      if (this.tipo_telefono === 'fijo') return 'cantv';
      const prefix = this.numero.substring(0, 4);
      const operadoras = {
        '0412': 'digitel',
        '0414': 'movistar',
        '0424': 'movistar',
        '0416': 'movilnet',
        '0426': 'movilnet'
      };
      return operadoras[prefix] || null;
    }
  },
  principal: {
    type: Boolean,
    default: false
  },
  activo: {
    type: Boolean,
    default: true
  }
}, {
  versionKey: false,
  timestamps: true
});

// Middleware para normalizar el número antes de guardar
telefonoSchema.pre('save', function(next) {
  // Elimina caracteres no numéricos y asegura formato 0 + código
  this.numero = this.numero.replace(/[^\d]/g, '');
  if (!this.numero.startsWith('0')) {
    this.numero = '0' + this.numero;
  }
  next();
});

// Virtual populate para relación con Personas (alternativa a associate)
telefonoSchema.virtual('personas', {
  ref: 'Persona',
  localField: '_id',
  foreignField: 'telefonos.telefono',
  justOne: false
});

// Método para formato de visualización
telefonoSchema.method('formatearNumero', function() {
  return `${this.codigo_pais} ${this.numero.substring(0, 4)}-${this.numero.substring(4)}`;
});

// Transformación del _id (opcional)
telefonoSchema.method('toJSON', function() {
  const { __v, _id, ...object } = this.toObject();
  object.tid = _id;
  return object;
});

module.exports = model('Telefono', telefonoSchema);