const { response } = require('express');
const Relacion = require('../models/relaciones.model');
const Persona = require('../models/personas.model');

const getRelacion = async (req, res = response) => {
    try {
        const relaciones = await Relacion.find();
        res.json({
            ok: true,
            relaciones
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en getRelaciones'
        });
    }    
};

const crearRelacion = async (req, res = response) => {
   try {
       const relacion = new Relacion(req.body);
       await relacion.save();
       res.json({
           ok: true,
           relacion
       });
   } catch (error) {
       console.error(error);
       res.status(500).json({
           ok: false,
           msg: 'Error en crearRelacion'
       });
   }
};

const eliminarRelacion = async (req, res = response) => {
       const rid = req.params;
   
    try {
        const relacionDB = await Relacion.findById(rid);       
       if (!relacionDB) {
           return res.status(404).json({
               ok: false,
               msg: 'Relacion no encontrada'
           });
       }
          await Relacion.findByIdAndDelete(rid);
       res.json({
           ok: true,
           msg: 'Registro eliminado'
       });
   } catch (error) {
       console.error(error);
       res.status(500).json({
           ok: false,
           msg: 'Error en eliminarRelacion'
       });
   }
};

module.exports = {
    getRelacion,
    crearRelacion,
    eliminarRelacion
};                          