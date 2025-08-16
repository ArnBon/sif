const { response } = require('express');
const SolicitudCobertura = require('../models/solicitud_cobertura.model');


const crearSolicitudCobertura = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'crearSolicitudCobertura',
  });
};

const eliminarSolicitudCobertura = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'eliminarSolicitudCobertura',
  });
};

module.exports = {
  crearSolicitudCobertura,
  eliminarSolicitudCobertura,
};
