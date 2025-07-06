const { Schema, model } = require('mongoose');

const personaSchema = new Schema({
    id_genero: {
        type: Schema.Types.ObjectId,
        ref: 'Genero',
        required: true
    },
    id_tipo_persona: {
        type: Schema.Types.ObjectId,
        ref: 'TipoPersona',
        required: true
    },
    id_edo_civil: {
        type: Schema.Types.ObjectId,
        ref: 'EstadoCivil',
        required: true
    },
    primer_apellido: {
        type: String,
        required: [true, 'El primer apellido es obligatorio'],
        trim: true
    },
    segundo_apellido: {
        type: String,
        trim: true
    },
    primer_nombre: {
        type: String,
        required: [true, 'El primer nombre es obligatorio'],
        trim: true
    },
    segundo_nombre: {
        type: String,
        trim: true
    },
    fecha_nac: {
        type: Date,
        validate: {
            validator: function(value) {
                return value < new Date();
            },
            message: 'La fecha de nacimiento debe ser en el pasado'
        }
    },
    tipo_identificacion: {
        type: String,
        enum: ['V', 'E', 'P', 'R'], // Venezolano, Extranjero, Pasaporte, RIF
        required: true
    },
    cedula: {
        type: String,
        unique: true,
        sparse: true // Permite null pero garantiza unicidad para valores no nulos
    },
    pasaporte: {
        type: String,
        unique: true,
        sparse: true
    },
    rif: {
        type: String,
        unique: true,
        sparse: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} no es un email válido!`
        }
    },
    foto_url: {
        type: String,
        default: null
    },
    activo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: { 
        createdAt: 'fecha_creacion',
        updatedAt: 'fecha_actualizacion' 
    },
    versionKey: false
});

// Método para transformar el _id a id y eliminar campos internos
personaSchema.method('toJSON', function() {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

// En Mongoose las relaciones se manejan con populate, no con associate
// Las relaciones N:M se gestionan a través de los modelos separados

module.exports = model('Persona', personaSchema);