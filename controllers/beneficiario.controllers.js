const { response } = require('express'); 

const getBeneficiarios = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'getBeneficiarios'
    });
};

const getBeneficiarioId = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'getBeneficiarioId'
    });
};

const crearBeneficiario = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'crearBeneficiario'
    });
};

const actualizarBeneficiario = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarBeneficiario'
    });
};

const eliminarBeneficiario = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'eliminarBeneficiario'
    });
};

module.exports = {
    getBeneficiarios,
    getBeneficiarioId,
    crearBeneficiario,
    actualizarBeneficiario,
    eliminarBeneficiario
};
