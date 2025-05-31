const { Schema, model } = require('mongoose');

const recuperaSchema = Schema({

    idusuario:{
        type:Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

    token:{
        type: String,
        required: true
    },

    fechacreacion:{
        type: Date,
        default: Date.now
    },

    fechaexpiracion:{
        type: Date,
        required: true
    } 
});

recuperaSchema.method('toJson', function(){
    const{ __v, _id, ...object} = this.toObject();
    object.id_recupera = _id;
    return object;
});
module.exports = model('Recupera', recuperaSchema);