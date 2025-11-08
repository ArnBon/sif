const { response } = require('express');
const FormaPago = require('../../models/forma_pago.model');



    const getFormaPago = async (req, res = response) => {
        try {
             //obtener todas las declaraciones
                const formaPago = await FormaPago.find({}, 'desc_forma_pago requiere_cuenta' )
            res.json({
                ok:true,
                formaPago
            });            
        } catch (error) {
            console.error(error)
            res.status(500).json({
                ok:true,
                msg: 'Error comuniquese con el administrador del sistema'
            });            
        }
    } 

    const getFormaPagoId = async (req, res = response) => {
        const fpid = req.params.id
        try {
            const formaPagoDB = await FormaPago.findById(fpid)          
            
            if(!formaPagoDB){
                return res.status(404).json({
                    ok:false,
                    msg: 'No existe forma de pago por ese Id'
                });
            }
            res.json({
                ok:true,
                formaPagoDB
            });            
        } catch (error) {
            console.error(error)
            res.status(500).json({
                ok:true,
                msg: 'Error comuniquese con el administrador del sistema'
            });            
        }
    }

    const crearFormaPago = async (req, res = response) => {
        const formaPago = new FormaPago(req.body);
        try {
            await formaPago.save();
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

    const actualizarFormaPago = async (req, res = response) => {
        const fpid = req.params.id
        try {

            const formaPagoDB = await FormaPago.findById(fpid)

            if(!formaPagoDB){
                return res.status(404).json({
                    ok:false,
                    msg: 'No existe forma de pago por ese Id'
                });
            }
             //actualizar el registro de ese id en especifico
               const campos = req.body;
            
            // eliminar campos que no me gustaria actualizar
               //delete campos.fecha_creacion;
    
            //actualizar el pago como tal
              const formaPago = await FormaPago.findByIdAndUpdate(fpid, campos, {new: true});
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

    const eliminarFormaPago = async (req, res = response) => {
        const fpid = req.params.id
        try {

            const formaPagoDB = await FormaPago.findById(fpid)

            if(!formaPagoDB){
                return res.status(404).json({
                    ok:false,
                    msg: 'No existe pago por ese Id'
                });
            }
            //eliminar el registro como tal
            await FormaPago.findByIdAndDelete(fpid)
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
   getFormaPago,
   getFormaPagoId,
   crearFormaPago,
   actualizarFormaPago,
   eliminarFormaPago
}