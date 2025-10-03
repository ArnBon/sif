const { response } = require('express');
const Relacion = require('../models/relacion.model');
const Persona = require('../models/personas.model');

const getRelaciones = async (req, res = response) => {
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
   try {
       const { id } = req.params;
       const relacion = await Relacion.findByIdAndDelete(id);
       if (!relacion) {
           return res.status(404).json({
               ok: false,
               msg: 'Relacion no encontrada'
           });
       }
       res.json({
           ok: true,
           relacion
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
    getRelaciones,
    getRelacionId,
    crearRelacion,
    actualizarRelacion,
    eliminarRelacion
};                          