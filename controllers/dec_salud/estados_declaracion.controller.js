const { response } = require('express');
const EstadoDeclaracion = require('../../models/estado_declaracion.model');  





const getEstadosDeclaracion = async (req, res = response) => {
    try {
        // Obtener las preguntas que hay
        const edoDeclaracion = await EstadoDeclaracion.find({}, 'id_tipo_intervencion nombre descripcion')
        res.json({
        ok:true,
        EstadoDeclaracion
    }); 
    } catch (error) {
        console.error(error);
    res.status(500).json({
        ok:false,
        msg: 'Error al encontrar declaraciones'
    });
    }
}

module.exports = {
    getEstadosDeclaracion
}