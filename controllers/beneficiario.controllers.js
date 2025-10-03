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
    try {
        const { id } = req.params;
        const beneficiario = await Beneficiario.findByIdAndDelete(id);
        if (!beneficiario) {
            return res.status(404).json({
                ok: false,
                msg: 'Beneficiario no encontrado'
            });
        }
        res.json({
            ok: true,
            beneficiario
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

