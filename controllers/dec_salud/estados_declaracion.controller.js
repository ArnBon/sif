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

//para administrador
const actualizarEstadosDeclaracion = async (req, res = response) => {
    const edid = req.params.id;
    try {
        const edoDeclaracionDB = await EstadoDeclaracion.findById(edid);
        if(!edoDeclaracionDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe registro por ese ID'
            });
        }
        const campos = req.body;
        const estadoDeclaracion = await EstadoDeclaracion.findByIdAndUpdate(edid, campos, {new: true})
        res.json({
            ok:true,
            msg: 'registro actualizado satisfactoriamente'
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al encontrar estado de declaracion'
        });        
    }
}

module.exports = {
    getEstadosDeclaracion,
    actualizarEstadosDeclaracion
}