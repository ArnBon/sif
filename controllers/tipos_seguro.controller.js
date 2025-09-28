const { response } = require('express');
const TipoSeguro = require('../models/tipo_seguro.model');

const getTiposSeguro = async (req, res = response) => {
  
try {
  const tiposSeguro = await TipoSeguro.find({}, 'id_tipo_seguro nombre_tipo_seguro descripcion');
  res.json({
    ok: true,
    tiposSeguro
  });
} catch (error) {
  console.error(error);
  res.status(500).json({
    ok: false,
    msg: 'Error al obtener los tipos de seguro'
  });
}
};


const getTipoSeguroPorId = async (req, res = response) => {
  const id = req.params.id; 
  try {
    const tipoSeguro = await TipoSeguro.findById(id);
    if (!tipoSeguro) {
      return res.status(404).json({
        ok: false,
        msg: 'Tipo de seguro no encontrado'
      });
    }
    res.json({
      ok: true,
      tipoSeguro
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al obtener el tipo de seguro'
    });
  }
};

const crearTipoSeguro = async (req, res = response) => {
  const tipoSeguro = new TipoSeguro(req.body);
  try {
    await tipoSeguro.save();
    res.status(201).json({
      ok: true,
      tipoSeguro
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al crear el tipo de seguro'
    });
  }
};

const actualizarTipoSeguro = async (req, res = response) => {
  const id = req.params.id;
  try {
    const tipoSeguroDB = await TipoSeguro.findById(id);
    if (!tipoSeguroDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Tipo de seguro no encontrado'
      });
    }
    await TipoSeguro.findByIdAndUpdate(id, req.body, { new: true });
    res.json({
      ok: true,
      msg: 'Tipo de seguro actualizado'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al actualizar el tipo de seguro'
    });
  }
};

const eliminarTipoSeguro = async (req, res = response) => {
  const id = req.params.id;
  try {
    const tipoSeguroDB = await TipoSeguro.findById(id);
    if (!tipoSeguroDB) {      
      return res.status(404).json({
        ok: false,
        msg: 'Tipo de seguro no encontrado'
      });
    }
    await TipoSeguro.findByIdAndDelete(id);
    res.json({
      ok: true,
      msg: 'Tipo de seguro eliminado'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al eliminar el tipo de seguro'
    });
  }
};


module.exports = {
  getTiposSeguro,
  getTipoSeguroPorId,
  crearTipoSeguro,
  actualizarTipoSeguro,
  eliminarTipoSeguro
};
