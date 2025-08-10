const { response } = require('express');

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
