const { Schema, model } = require('mongoose');

const permisoSchema = Schema({
    nombre_permiso: {
        type:String, 
        unique: true
    },

    descripcion: {
        type:String
    }
});

permisoSchema.method('toJson', function(){
    const{ __v, _id, ...object} = this.toObject();
    object.id_permiso = _id;
    return object;
});

module.exports = model('Permiso', permisoSchema);