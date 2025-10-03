const { response } = require('express');
const SolicitudSeguro = require('../models/solicitud_seguro.model');

const getSolicitudesSeguro = async (req, res = response) => {
    try {
        //obtener todas las solicitudes de seguro
        const solicitudesSeguro = await SolicitudSeguro.find( {}, 'id_solicitud_seg id_persona tipo_seguro fecha_solicitud estado_solicitud' );
        res.json({
            ok: true,
            solicitudesSeguro
        });        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en getRelaciones'
        });
    }
};

const getSolicitudSeguroId = async (req, res = response) => {
    const ssid = req.params.id;

     try {
        //Encuentra la solicitud de seguro por ID
        const solicitudSeguroDB = await SolicitudSeguro.findById(ssid)
            .populate('id_persona', 'nombre apellido id_tipo_persona')
            .populate('id_tipo_seguro', 'descripcion codigo')
            .populate('id_estado_solicitud', 'descripcion codigo');

        if(!solicitudSeguroDB){
            return res.status(404).json({
                ok: false,
                msg: 'Solicitud de seguro no encontrada'
            });
        }
        res.json({
            ok: true,
            solicitudSeguro: solicitudSeguroDB
        });
     } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en getRelacionId'
        });
     }



};

const crearSolicitudSeguro = async (req, res = response) => {

    const solicitudSeguro = new SolicitudSeguro(req.body);

    try {
        await solicitudSeguro.save();
        res.json({
            ok: true,
            solicitudSeguro
        });        
        } catch (error) {
            console.error(error);
            res.status(500).json({
                ok: false,
                msg: 'Error en crearRelacion'
            });        
    }
};

const actualizarSolicitudSeguro = async (req, res = response) => {

const ssid = req.params.id;
    try {
        //1.- encuentra el SSID de la solcitud de seguro
        const solicitudSeguroDB = await SolicitudSeguro.findById(ssid);

        if(!solicitudSeguroDB){
            return res.status(404).json({
                ok: false,
                msg: 'Solicitud de seguro no encontrada'
            });
        }
        //2.- Actualiza la solicitud de seguro
        const campos = req.body;

        //3.- Actualiza el registro por ese SSID
        const solicitudSeguroActualizado = await SolicitudSeguro.findByIdAndUpdate(ssid, campos, { new: true });
        res.json({
            ok: true,
            msg: 'actualizarRelacion'
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en actualizarRelacion'
        });        
    }
};

const eliminarSolicitudSeguro = async (req, res = response) => {
    const ssid = req.params.id;

    try {
        const solicitudSeguroDB = await SolicitudSeguro.findById(ssid);

        if(!solicitudSeguroDB){
            return res.status(404).json({
                ok: false,
                msg: 'Solicitud de seguro no encontrada'
            });
        }

        await SolicitudSeguro.findByIdAndDelete(ssid);
        res.json({
            ok: true,
            msg: 'Solicitud de seguro eliminada'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en eliminarRelacion'
        });
    }
    res.json({
        ok: true,
        msg: 'eliminarRelacion'
    });
};

module.exports = {
   getSolicitudesSeguro,
   getSolicitudSeguroId,
   crearSolicitudSeguro,
   actualizarSolicitudSeguro,
   eliminarSolicitudSeguro
};