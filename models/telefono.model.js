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
    validate: {
    validator: function(v) {
    // Valida formatos: 04121234567, 02121234567, 4121234567
    return /^(0?4(12|14|16|24|26)|(0?212))\d{7}$/.test(v); // Aquí estaba el error
 },
 message: props => `${props.value} no es un número válido en Venezuela!`
 }
},
tipo_telefono: {
    type: String,
    enum: ['movil', 'fijo', 'familia', 'trabajo', 'emergencia'],
    required: true
},
operadora: {
    type: String,
    enum: ['movistar', 'digitel', 'movilnet', 'cantv', null],
    default: function() {
    if (this.tipo_telefono === 'fijo') return 'cantv';
    const prefix = this.numero.substring(0, 4);
    const operadoras = {
    '0412': 'movistar',
    '0414': 'movistar',
    '0424': 'digitel',
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

}, {
versionKey: false,
timestamps: true
});

Telefono.associate = (models) => {
    Telefono.belongsToMany(models.Persona, {
      through: 'personas_telefonos',
      foreignKey: 'id_telefono',
      otherKey: 'id_persona',
      as: 'personas',
    });
  }

  telefonoSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.did = _id;
    return object;
});


module.exports = model('Telefono', telefonoSchema);