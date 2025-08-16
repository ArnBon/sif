const { Schema, model } = require('mongoose');

const planSchema = Schema({

    nombre_plan: {
        type: String,
        required: true,
        maxlength: 100,
        unique: true
    },

    suma_asegurada: {
        type: Number,
        required: true,
        min: 0
    } 

});
planSchema.method('toJSON', function(){
    const{ __v, _id, ...object} = this.toObject();
    object.id_plan = _id;
    return object;
});

module.exports = model('Plan', planSchema);