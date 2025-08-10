const { response } = require('express');

const getTiposSeguro = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'getTiposSeguro',
  });
};

module.exports = {
  getTiposSeguro  
};
