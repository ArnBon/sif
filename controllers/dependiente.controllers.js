const { response } = require('express'); 

const getDependientes = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'getDependientes'
    });
};

const getDependienteId = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'getDependienteId'
    });
};

const crearDependiente = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'crearDependiente'
    });
};

const actualizarDependiente = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarDependiente'
    });
};

const eliminarDependiente = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'eliminarDependiente'
    });
};

module.exports = {
    getDependientes,
    getDependienteId,
    crearDependiente,
    actualizarDependiente,
    eliminarDependiente
};
