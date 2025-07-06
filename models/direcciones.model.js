const { Schema, model } = require('mongoose');
const Estado = require('../models/estado.model');
const Ciudad = require('../models/ciudad.model');
const Municipio = require('../models/municipio.model');
const Parroquia = require('../models/parroquia.model');
const Direccion = require('../models/direcciones.model');



const direccionSchema = Schema({

    direccion: {
        type: String,
        required: true
    },

    cod_postal: {
        type: String
    },

    referencia: {
        type: String
    },

    id_estado: {
        type: Schema.Types.ObjectId,
        ref: Estado,
        required: true
    },

    id_ciudad: {
        type: Schema.Types.ObjectId,
        ref: Ciudad,
        required: true
    },

    id_parroquia: {
        type: Schema.Types.ObjectId,
        ref: Parroquia,
        required: true
    },

    id_municipio: {
        type: Schema.Types.ObjectId,
        ref: Municipio,
        required: true
    },
        


});

Direccion.associate = (models) => {
    Direccion.belongsToMany(models.Persona, {
      through: 'personas_direcciones',
      foreignKey: 'id_direccion',
      otherKey: 'id_persona',
      as: 'personas',
    });
  }

direccionSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.did = _id;
    return object;
});

module.exports = model('Direccion', direccionSchema);