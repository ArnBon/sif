const { response } = require('express');
const TipoCondicionSalud = require( '../../models/tipo_condicion_salud.model' );


     const getTiposCondicionSalud = async (req, res = response) => {
        try {
            // Obtener las preguntas que hay
            const tipoCondicionSalud = await TipoCondicionSalud.find({}, 'id_tipo_condicion nombre descripcion')
            res.json({
                ok:true,
                msg: 'tarea realizada'
            });
            
        } catch (error) {
            console.error(error);
            res.status(500).json({
                ok:false,
                msg: 'Error'
            });            
        }
     }

     const getTipoCondicionSaludId = async (req, res = response) => {
        const tcsid = req.params.id
        try {
            const tipoCondicionDB = await TipoCondicionSalud.findById(tcsid)
            .populate('id_tipo_condicion') //no se si esto es necesario

            if(!tipoCondicionDB){
                return res.status(404).json({
                    ok:false,
                    msg: 'Registro no encontrado'
                });
            }            
            res.json({
                ok:true,
                tipoCondicionDB
            });            
        } catch (error) {
            console.error(error);
            res.status(500).json({
                ok:false,
                msg: 'Error contacte al administrador del sistema'
            });            
        }
     }

     const crearTipoCondicionSalud = async (req, res = response) => {
        const tipoCondicionSalud = new TipoCondicionSalud (req.body);        
        try {
            await tipoCondicionSalud.save();
            res.json({
            ok:true,
            msg: 'Pregunta creada satisfactoriamente'
        });  
        } catch (error) {
            console.error(error);
            res.status(500).json({
                ok:false,
                msg: 'Error'
            });            
        }
     }

     const actualizarTipoCondicionSalud = async (req, res = response) => {
        const tcsid = req.params.id
        try {
            const tipoCondicionDB = await TipoCondicionSalud.findById(tcsid)
            if(!tipoCondicionDB){
                return res.status(404).json({
                    ok:false,
                    msg: 'Registro no encontrado'
                });
            }
            //2.- actualiza el resitro por ese pid        
            const campos = req.body; //son los campos del endpoint | postman
    
            //actualizar la pregunta como tal
            const tipoCondicion = await TipoCondicionSalud.findByIdAndUpdate(tcsid, campos, {new: true});

            res.json({
                ok:true,
                msg: 'Tipos de condición actualizada'
            });
            
        } catch (error) {
            console.error(error);
            res.status(500).json({
                ok:false,
                msg: 'Error'
            });            
        }
     }

     const eliminarTipoCondicionSalud = async (req, res = response) => {
        const tcsid = req.params.id
        try {
            const tipoCondicionDB = await TipoCondicionSalud.findById(tcsid)
            if(!tipoCondicionDB){
                return res.status(404).json({
                    ok:false,
                    msg: 'Registro no encontrado'
                });
            }
                //elimina el registro como tal
                await TipoCondicionSalud.findByIdAndDelete
            res.json({
                ok:true,
                msg: 'Tipo condición salud eliminada'
            });
            
        } catch (error) {
            console.error(error);
            res.status(500).json({
                ok:false,
                msg: 'Error'
            });
            
        }
     }

module.exports = {
     getTiposCondicionSalud,
     getTipoCondicionSaludId,
     crearTipoCondicionSalud,
     actualizarTipoCondicionSalud,
     eliminarTipoCondicionSalud
}