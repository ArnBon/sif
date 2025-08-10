const { response } = require('express');

const getPlanes = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'getPlanes',
  });
};

const crearPlan = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'crearPlan',
  });
};

const actualizarPlan = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'actualizarPlan',
  });
};

const eliminarPlan = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'eliminarPlan',
  });
};

module.exports = {
  getPlanes,
  crearPlan,
  actualizarPlan,
  eliminarPlan,
};