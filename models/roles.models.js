const { Schema, model } = require('mongoose');


const rolSchema = Schema({
      nombre_rol: {
        type:String, 
        unique: true
    },

    descripcion: {
        type:String
    },

    permisos:[{
        type: Schema.Types.ObjectId,
        ref: 'Permiso'
    }]
});

rolSchema.method('toJson', function(){
    const{ __v, _id, ...object} = this.toObject();
    object.id_rol = _id;
    return object;
});


module.exports = model('Rol', rolSchema);