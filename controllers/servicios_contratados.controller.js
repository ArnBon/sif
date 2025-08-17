const { response } = require('express');
const ServicioContratado = require('../models/servicio_contratado.model');


const getServiciosContratado = async (req, res = response) => {
  try { 
    //obtener todos los servicios contratados
    const serviciosC = await ServicioContratado.find({}, 'id_servicio nombre_servicio');
  res.json({
    ok: true,    
    servicios: serviciosC
  });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Error en el servidor',
    });
  }  
};


const getServicioContratadoById = async (req, res = response) => {
  try {
    const id_servicio = req.params.id;
    const servicioC = await ServicioContratado.findById(id_servicio);

    if (!servicioC) {
      return res.status(404).json({
        ok: false,
        msg: 'Servicio no encontrado',
      });
    }
  res.json({
    ok: true,
    servicioC
  });  
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Error en el servidor',
    });
  }
  
};


crearServicioContratado = async (req, res = response) => {
  const servicio_contratado = new ServicioContratado(req.body); //crear el objeto del servicio contratado
  try {
    await servicio_contratado.save(); //guardar en la base de datos
  res.json({
    ok: true,
    msg: 'Servicio contratado creado exitosamente',
  });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Error en el servidor',
    });
  }
  
};


actualizarServicioContratado = async (req, res = response) => {
  const scid = req.params.id;
  try {
    const servicioCDB = await ServicioContratado.findById(scid);
    if (!servicioCDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Servicio no encontrado',
      });
    }
    // Actualizar los campos del servicio contratado

    const edicionServCont = await ServicioContratado.findByIdAndUpdate(scid, req.body, { new: true });
  res.json({
    ok: true,
    msg: 'actualizarServicio',
  });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Error en el servidor',
    });
  }
  
};


const eliminarServicioContratado = async (req, res = response) => {
  const scid = req.params.id;
  try {
    const servicioCDB = await ServicioContratado.findById(scid);
    if (!servicioCDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Servicio no encontrado',
      });
    }
    // Eliminar el servicio contratado
    await ServicioContratado.findByIdAndDelete(scid);
  res.json({
    ok: true,
    msg: 'Servicio contratado eliminado exitosamente',
  });
  } catch (error) {
    
  }
  
};

module.exports = {
  getServiciosContratado,
  getServicioContratadoById,
  crearServicioContratado,
  actualizarServicioContratado,
  eliminarServicioContratado
};
