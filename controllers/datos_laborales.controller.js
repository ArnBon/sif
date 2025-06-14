const { response } = require('express');
const DatosLaborales = require('../models/datos_laborales.model');




const getdatosLaborales = async (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Obtener datos laborales'
    });
}



const getdatosLaboralesId = async (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Obtener datos laborales por Id'
    });
}



const creardatosLaborales = async (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Crear datos laborales'
    });
}



const actualizardatosLaborales = async (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Actualizar datos laborales'
    });
}



const eliminardatosLaborales = async (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Eliminar datos laborales'
    });
}

module.exports = {
    getdatosLaborales,
    getdatosLaboralesId,
    creardatosLaborales,
    actualizardatosLaborales,
    eliminardatosLaborales
}