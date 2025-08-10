const { response } = require('express');


const getCoberturas = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'getCoberturas',
  });
};

const crearCobertura = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'crearCobertura',
  });
};

const actualizarCobertura = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'actualizarCobertura',
  });
};

const eliminarCobertura = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'eliminarCobertura',
  });
};

module.exports = {
  getCoberturas,
  crearCobertura,
  actualizarCobertura,
  eliminarCobertura,
};
