const { response } = require('express');
const Cobertura = require('../models/cobertura.model');

const getCoberturas = async (req, res = response) => {
  try {
    // obtenemos todas las coberturas
    const coberturas = await Cobertura.find({}, 'nombre descripcion requiere_servicios');
    res.json({
      ok: true,
      msg: 'getCoberturas',
      coberturas //muestra todas las coberturas
    });
  } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        msg: 'Error en el servidor',
      });
  }  
};

const crearCobertura = async (req, res = response) => {
  const cobertura = new Cobertura(req.body); //crear el objeto cobertura
  try {
    await cobertura.save(); //guardar la nueva cobertura  
  res.status(201).json({
    ok: true,
    msg: 'Cobertura creada correctamente !',
  });  
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Error en el servidor',
    });
  }
};

const actualizarCobertura = async (req, res = response) => {
  const cid = req.params.id;
  try {
    const coberturaDB = await Cobertura.findById(cid);

    if (!coberturaDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Cobertura no encontrada',
      });
    }
  //actualiza la cobertura en la bd
  const edicionCobertura = await Cobertura.findByIdAndUpdate(cid, req.body, { new: true });
  res.json({
    ok: true,
    msg: 'actualizarCobertura',
  });  
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Error en el servidor',
    });
  }
};


const eliminarCobertura = async (req, res = response) => {
  const cid = req.params.id;
  try {
    const coberturaDB = await Cobertura.findById(cid);
    if (!coberturaDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Cobertura no encontrada',
      });
    }
    await Cobertura.findByIdAndDelete(cid);
    res.json({
      ok: true,
      msg: 'Cobertura eliminada correctamente',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Error en el servidor',
    });
  }
};
   



module.exports = {
  getCoberturas,
  crearCobertura,
  actualizarCobertura,
  eliminarCobertura,
};
