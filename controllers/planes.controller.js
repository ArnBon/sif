const { response } = require('express');
const Plan = require('../models/planes.model');


const getPlanes = async (req, res = response) => {

try {
  //obtener todos los planes
  const planes = await  Plan.find({},'id_plan nombre_plan suma_asegurada');  
  res.json({
    ok: true,
    planes // Devuelve la lista de planes,
  });
} catch (error) {
  console.error(error);
  res.status(500).json({
    ok: false,
    msg: 'Error al obtener los planes',
  });
}
};

const crearPlan = async (req, res = response) => {

  const plan = new Plan(req.body) //crear el objeto Plan
try {
  await plan.save(); //guardar en la base de datos

  res.status(201).json({
    ok: true,
    plan,
  });
} catch (error) {
  console.error(error);
  res.status(500).json({
    ok: false,
    msg: 'Error al crear el plan',
  });
}
};


const actualizarPlan = async (req, res = response) => {
  const pid = req.params.id;

try {  
  const planDB = await Plan.findById(pid);

    if (!planDB) {
      return res.status(404).json({
      ok: true,
      msg: 'No existe plan',
    });    
  }
  //actualiza elplan en la bd
  const edicionPlan = await Plan.findByIdAndUpdate(pid, req.body, {new: true});
  res.json({
    ok: true,
    plan: edicionPlan,
  });  
} catch (error) {
  console.error(error);
  res.status(500).json({
    ok: false,
    msg: 'Error al actualizar el plan',
  });
}
};

const eliminarPlan = async (req, res = response) => {
  const pid = req.params.id;

try {
  const planDB = await Plan.findById(pid);

  if (!planDB) {
      return res.status(404).json({
      ok: true,
      msg: 'No existe plan',
    });    
  }
  await Plan.findByIdAndDelete(pid);
  res.json({
    ok: true,
    msg: 'Plan eliminado',
  });
} catch (error) {
  console.error(error);
  res.status(500).json({
    ok: false,
    msg: 'Error al eliminar el plan',
  });
}
};

module.exports = {
  getPlanes,
  crearPlan,
  actualizarPlan,
  eliminarPlan,
};