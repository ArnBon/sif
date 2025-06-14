const { response } = require('express');
const Telefono = require('../models/telefono.model');


const getTelefono = async (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Obtener Telefono'
    });
}



const getTelefonoId = async (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Obtener Telefono por Id'
    });
}



const crearTelefono = async (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Crear Telefono'
    });
}



const actualizarTelefono = async (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Actualizar Telefono'
    });
}




const eliminarTelefono = async (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Eliminar Telefono'
    });
}

module.exports = {
    getTelefono,
    getTelefonoId,
    crearTelefono,
    actualizarTelefono,
    eliminarTelefono
}
