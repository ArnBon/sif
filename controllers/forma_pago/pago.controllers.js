const { response } = require('express');
const Pago = require('../../models/pago.model');



    const getPagos = async (req, res = response) => {
        try {
             //obtener todas las declaraciones
                const pago = await Pago.find({}, 'id_persona id_frecuencia id_moneda id_forma_pago id_banco id_tipo_cuenta num_cta num_tarjeta fecha_pago usuario_creacion usuario_actualizacion' )
            res.json({
                ok:true,
                pago
            });            
        } catch (error) {
            console.error(error)
            res.status(500).json({
                ok:true,
                msg: 'Error comuniquese con el administrador del sistema'
            });            
        }
    } 

    const getPagosId = async (req, res = response) => {
        const pid = req.params.id
        try {
            const pagoDB = await Pago.findById(pid)
            .populate('id_frecuencia')
            .populate('id_moneda')
            .populate('id_forma_pago')
            .populate('id_banco')
            .populate('id_tipo_cuenta')
            
            if(!pagoDB){
                return res.status(404).json({
                    ok:false,
                    msg: 'No existe pago por ese Id'
                });
            }
            res.json({
                ok:true,
                pagoDB
            });            
        } catch (error) {
            console.error(error)
            res.status(500).json({
                ok:true,
                msg: 'Error comuniquese con el administrador del sistema'
            });            
        }
    }

    const crearPagos = async (req, res = response) => {
        const pago = new Pago(req.body);
        try {
            await pago.save();
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

    const actualizarPagos = async (req, res = response) => {
        const pid = req.params.id
        try {

            const pagoDB = await Pago.findById(pid)

            if(!pagoDB){
                return res.status(404).json({
                    ok:false,
                    msg: 'No existe pago por ese Id'
                });
            }
             //actualizar el registro de ese id en especifico
               const campos = req.body;
            
            // eliminar campos que no me gustaria actualizar
               //delete campos.fecha_creacion;
    
            //actualizar el pago como tal
              const pago = await Pago.findByIdAndUpdate(deid, campos, {new: true});
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

    const eliminarPagos = async (req, res = response) => {
        const pid = req.params.id
        try {

            const pagoDB = await Pago.findById(pid)

            if(!pagoDB){
                return res.status(404).json({
                    ok:false,
                    msg: 'No existe pago por ese Id'
                });
            }
            //eliminar el registro como tal
            await Pago.findByIdAndDelete
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
    getPagos,
    getPagosId,
    crearPagos,
    actualizarPagos,
    eliminarPagos
}