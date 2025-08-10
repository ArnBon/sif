const { response } = require('express');


const getCoberturas = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'getCoberturas',
  });
};

const getCoberturaId = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'getCoberturaId',
  });
};



crearCobertura = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'crearCobertura',
  });
};

actualizarCobertura = (req, res = response) => {
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
  getCoberturaId,
  crearCobertura,
  actualizarCobertura,
  eliminarCobertura,
};
