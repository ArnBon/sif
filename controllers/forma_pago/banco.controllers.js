const { response } = require('express');
const Banco = require('../../models/banco.model');



    const getBanco = async (req, res = response) => {
        try {
             //obtener todas las declaraciones
                const banco = await Banco.find({}, 'id_persona id_frecuencia id_moneda id_forma_banco id_banco id_tipo_cuenta num_cta num_tarjeta fecha_banco usuario_creacion usuario_actualizacion' )
            res.json({
                ok:true,
                banco
            });            
        } catch (error) {
            console.error(error)
            res.status(500).json({
                ok:true,
                msg: 'Error comuniquese con el administrador del sistema'
            });            
        }
    } 

    const getBancoId = async (req, res = response) => {
        const bid = req.params.id
        try {
            const bancoDB = await Banco.findById(bid)            
            if(!bancoDB){
                return res.status(404).json({
                    ok:false,
                    msg: 'No existe banco por ese Id'
                });
            }
            res.json({
                ok:true,
                bancoDB
            });            
        } catch (error) {
            console.error(error)
            res.status(500).json({
                ok:true,
                msg: 'Error comuniquese con el administrador del sistema'
            });            
        }
    }

    const crearBanco = async (req, res = response) => {
        const banco = new Banco(req.body);
        try {
            await banco.save();
            res.json({
                ok:true,
                msg: 'Se ha creado el regitro exitosamente'
            });            
        } catch (error) {
            console.error(error)
            res.status(500).json({
                ok:true,
                msg: 'Error comuniquese con el administrador del sistema'
            });            
        }
    }

    const actualizarBanco = async (req, res = response) => {
        const bid = req.params.id
        try {

            const bancoDB = await Banco.findById(bid)

            if(!bancoDB){
                return res.status(404).json({
                    ok:false,
                    msg: 'No existe banco por ese Id'
                });
            }
             //actualizar el registro de ese id en especifico
               const campos = req.body;  
    
            //actualizar el banco como tal
              const banco = await Banco.findByIdAndUpdate(bid, campos, {new: true});
            res.json({
                ok:true,
                msg: 'Registro actualizado'
            });            
        } catch (error) {
            console.error(error)
            res.status(500).json({
                ok:true,
                msg: 'Error comuniquese con el administrador del sistema'
            });            
        }
    }

    const eliminarBanco = async (req, res = response) => {
        const bid = req.params.id
        try {

            const bancoDB = await banco.findById(bid)

            if(!bancoDB){
                return res.status(404).json({
                    ok:false,
                    msg: 'No existe banco por ese Id'
                });
            }
            //eliminar el registro como tal
            await Banco.findByIdAndDelete
            res.json({
                ok:true,
                msg: 'Registro eliminado'
            });            
        } catch (error) {
            console.error(error)
            res.status(500).json({
                ok:true,
                msg: 'Error comuniquese con el administrador del sistema'
            });            
        }
    }


module.exports = {
    getBanco, 
    getBancoId,
    crearBanco,
    actualizarBanco,
    eliminarBanco
}