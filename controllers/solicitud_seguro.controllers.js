const { response } = require('express');

const getRelaciones = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'getRelaciones'
    });
};

const getRelacionId = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'getRelacionId'
    });
};

const crearRelacion = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'crearRelacion'
    });
};

const actualizarRelacion = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarRelacion'
    });
};

const eliminarRelacion = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'eliminarRelacion'
    });
};

module.exports = {
    getRelaciones,
    getRelacionId,
    crearRelacion,
    actualizarRelacion,
    eliminarRelacion
};