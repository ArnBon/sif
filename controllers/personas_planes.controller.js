const { response } = require('express');
const PersonaPlan = require('../models/personas_planes.model');

const crearPersonaPlan = async (req, res = response) => {
  const crearPersonaPlan = new PersonaPlan(req.body) //crear el objeto PersonaPlan
  try {
    await crearPersonaPlan.save(); //guardar en la base de datos

    res.status(201).json({
      ok: true,
      crearPersonaPlan,
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al crear el plan de la persona'
    });
  }

};

const actualizarPersonaPlan = async (req, res = response) => {
  const persPlanDB = await PersonaPlan.findById(req.params.id);
  if (!persPlanDB) {
    return res.status(404).json({
      ok: false,
      msg: 'Plan de persona no encontrado'
    });
  }

  try {
    const { nombre, edad, plan } = req.body;
    persPlanDB.nombre = nombre;
    persPlanDB.edad = edad;
    persPlanDB.plan = plan;
    await persPlanDB.save();

    res.json({
      ok: true,
      persPlanDB
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al actualizar el plan de la persona'
    });
  }
};

const eliminarPersonaPlan = async (req, res = response) => {
  const persPlanDB = await PersonaPlan.findById(req.params.id);
  if (!persPlanDB) {
    return res.status(404).json({
      ok: false,
      msg: 'Plan de persona no encontrado'
    });
  }

  try {
    await PersonaPlan.findByIdAndDelete(req.params.id);

    res.json({
      ok: true,
      msg: 'Plan de persona eliminado'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al eliminar el plan de la persona'
    });
  }
 
};
module.exports = {
  crearPersonaPlan,
  actualizarPersonaPlan,
  eliminarPersonaPlan
}   