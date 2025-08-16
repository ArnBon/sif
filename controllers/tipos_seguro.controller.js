const { response } = require('express');
const TipoSeguro = require('../models/tipo_seguro.model');

const getTiposSeguro = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'getTiposSeguro',
  });
};

module.exports = {
  getTiposSeguro  
};
