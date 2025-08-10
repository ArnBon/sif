const { response } = require('express');

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

eliminarPlan