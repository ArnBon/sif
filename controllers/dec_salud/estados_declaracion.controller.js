const { response } = require('express');
const EstadoDeclaracion = require('../../models/estado_declaracion.model');  



const crearEstadoDeclaracion = async (req, res = response) => {
    try {
        const { id_edo_declaracion, nombre, descripcion } = req.body;
        
        // Verificar si ya existe
        const estadoExistente = await EstadoDeclaracion.findOne({ 
            $or: [
                { id_edo_declaracion: id_edo_declaracion },
                { nombre: nombre }
            ]
        });
        
        if(estadoExistente) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un estado con ese ID o nombre'
            });
        }
        
        // Crear nuevo estado
        const nuevoEstado = new EstadoDeclaracion({
            id_edo_declaracion,
            nombre, 
            descripcion
        });
        
        await nuevoEstado.save();
        
        res.json({
            ok: true,
            msg: 'Estado de declaración creado correctamente',
            data: nuevoEstado
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear estado de declaración'
        });
    }
}

const getEstadosDeclaracion = async (req, res = response) => {
    try {
        // Obtener las preguntas que hay
        const edoDeclaracion = await EstadoDeclaracion.find({}, 'id_edo_declaracion nombre descripcion')
        res.json({
        ok:true,
        edoDeclaracion
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
    crearEstadoDeclaracion,
    getEstadosDeclaracion,
    actualizarEstadosDeclaracion
}