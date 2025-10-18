const { response } = require('express');
const TipoIntervencion = require('../../models/tipo_intervencion_model');

     


const getTiposIntervencion = async (req, res = response) => {
    try {
        // Obtener las preguntas que hay
        const tipoIntervencion = await TipoIntervencion.find({}, 'id_tipo_intervencion nombre descripcion');
        res.json({
        ok:true,
        tipoIntervencion
    }); 
    } catch (error) {
        console.error(error);
    res.status(500).json({
        ok:false,
        msg: 'Error al encontrar declaraciones'
    });
    }
}

const getTiposIntervencionId = async (req, res = response) => {
    const tiid = req.params.id;
    try {        
        const tipoIntervencionDB = await TipoIntervencion.findById(tiid);       

        if(!tipoIntervencionDB){
            return res.status(404).json({
                ok:false,
                msg: 'Tipo de intervención no encontrado',
            });
        }
        res.json({
        ok:true,
        tipoIntervencionDB
    });
    } catch (error) {
        console.error(error);
    res.status(500).json({
        ok:false,
        msg: 'Error al encontrar tipo de intervencion'
    });
    }
}

const crearTiposIntervencion = async (req, res = response) => {
    const tipoIntervencion = new TipoIntervencion(req.body);
    try {
        await tipoIntervencion.save();
        res.json({
        ok:true,
        msg: 'Intervención creada satisfactoriamente'
    });  
    } catch (error) {
        console.error(error);
    res.status(500).json({
        ok:false,
        msg: 'Error al crear Intervención'
    });
    }
}

const actualizarTiposIntervencion = async (req, res = response) => {
    const tiid = req.params.id;
    try {
        const tipoIntervencionDB = await TipoIntervencion.findById(tiid);
        if(!tipoIntervencionDB){
            return res.status(404).json({
                ok:false,
                msg: 'No existe Intervención'
            });
        }
        //2.- actualiza el resitro por ese pid        
        const campos = req.body; //son los campos del endpoint | postman

        //actualizar la pregunta como tal
        const tipoIntervencion = await TipoIntervencion.findByIdAndUpdate(tiid, campos, {new: true});
        res.json({
        ok:true,
        msg: 'Pregunta actualizada correctamente'
    });  
    } catch (error) {
        console.error(error);
    res.status(500).json({
        ok:false,
        msg: 'Error al encontrar declaraciones'
    });
    }
}

const eliminarTiposIntervencion = async (req, res = response) => {
    const tiid = req.params.id;
    try {
        const tipoIntervencionDB = await TipoIntervencion.findById(tiid);
        if(!tipoIntervencionDB){
            return res.status(404).json({
                ok:false,
                msg: 'No existe esa pregunta'
            });
        }
            //elimina el registro como tal
                await TipoIntervencion.findByIdAndDelete(tiid);
        res.json({
        ok:true,
        msg: 'Registro eliminado...'
    });  
    } catch (error) {
        console.error(error);
    res.status(500).json({
        ok:false,
        msg: 'Error al encontrar Intervención'
    });
    }
}
module.exports = {
    getTiposIntervencion,
    getTiposIntervencionId,
    crearTiposIntervencion,
    actualizarTiposIntervencion,
    eliminarTiposIntervencion
}