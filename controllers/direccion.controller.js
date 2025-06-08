const { response } = require('express');
const Direccion = require('../models/direcciones.model');

const getDireccion = async (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Obtener Direccion'
    });
}



const getDireccionId = async (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Obtener Direccion por Id'
    });
}



const crearDireccion = async (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Crear Direccion'
    });
}



const actualizarDireccion = async (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Actualizar Direccion'
    });
}



const eliminarDirecion = async (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Eliminar Direccion'
    });
}

module.exports = {
    getDireccion,
    getDireccionId,
    crearDireccion,
    actualizarDireccion,
    eliminarDirecion
}