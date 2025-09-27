const { response } = require('express');
const SolicitudCobertura = require('../models/solicitud_cobertura.model');


const crearSolicitudCobertura = async (req, res = response) => {
  const planSol = new SolicitudCobertura(req.body) //crear el objeto de la solicitud de cobertura

  try {
    await planSol.save(); //guardar en la base de datos    
    res.status(201).json({
      ok: true,
      planSol,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg: 'Error al crear la Solicitud de Cobertura'
    });    
  }
};

const eliminarSolicitudCobertura = async (req, res = response) => {
  const pid = req.params.id;

  try {
    const solCobDB = await SolicitudCobertura.findById(pid);

    if(!solCobDB){
      return res.status(404).json({
        ok: true,
        msg: 'No existe la Solicitud de Cobertura',
      });
    }
    await SolicitudCobertura.findByIdAndDelete(pid);
    res.json({
      ok: true,
      msg: 'Solicitud de Cobertura eliminada',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al eliminar la Solicitud de Cobertura',
    });    
  }
  
};

module.exports = {
  crearSolicitudCobertura,
  eliminarSolicitudCobertura,
};
