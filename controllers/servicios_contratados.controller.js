const { response } = require('express');
const ServicioContratado = require('../models/servicio_contratado.model');


const getServicios = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'getServicios',
  });
};

const getServicioById = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'getServicioById',
  });
};



crearServicio = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'crearServicio',
  });
};

actualizarServicio = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'actualizarServicio',
  });
};

const eliminarServicio = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'eliminarServicio',
  });
};

module.exports = {
  getServicios,
  getServicioById,
  crearServicio,
  actualizarServicio,
  eliminarServicio
};
