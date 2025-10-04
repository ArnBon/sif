const { response } = require('express');
const Beneficiario = require('../models/beneficiario.model');
const Persona = require('../models/personas.model'); 

const getBeneficiarios = async  (req, res = response) => {
    try {
        const beneficiarios = await Beneficiario.find();
        res.json({
            ok: true,
            beneficiarios
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en getBeneficiarios'
        });
    }
};

const crearBeneficiario = async (req, res = response) => {

    try {
        const beneficiario = new Beneficiario(req.body);
        await beneficiario.save();
        res.json({
            ok: true,
            beneficiario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en crearBeneficiario'
        });
    }   
};

const eliminarBeneficiario = async (req, res = response) => {
    const bid = req.params;
    try {
        
        const beneficiarioDB = await Beneficiario.findById(bid);
        if (!beneficiarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Beneficiario no encontrado'
            });
        }
        await Beneficiario.findByIdAndDelete(bid);
        res.json({
            ok: true,
            msg: 'Registro eliminado'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en eliminarBeneficiario'
        });
    }
};
module.exports = {
    getBeneficiarios,
    crearBeneficiario,
    eliminarBeneficiario
};

