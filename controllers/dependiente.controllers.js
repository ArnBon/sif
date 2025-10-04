const { response } = require('express'); 
const Dependiente = require('../models/dependientes.model');
const Persona = require('../models/personas.model');

const getDependientes = async (req, res = response) => {
    try {
        const dependientes = await Dependiente.find({}, 'id_dependiente id_persona');        
        res.json({
            ok: true,            
            dependientes
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en getDependientes'
        });
    }
    
};

const crearDependiente = async (req, res = response) => {
    const { id_persona } = req.body;

    try {
        const persona = await Persona.findById(id_persona);
        if (!persona) {
            return res.status(404).json({
                ok: false,
                msg: 'Persona no encontrada'
            });
        }

        const dependiente = new Dependiente(req.body);
        await dependiente.save();

        res.json({
            ok: true,
            dependiente
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en crearDependiente'
        });
    }
    
};

const eliminarDependiente = async (req, res = response) => {
    const did = req.params;

    try {
        const dependienteDB = await Dependiente.findById(did);
        if (!dependienteDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Dependiente no encontrado'
            });
        }
        await Dependiente.findByIdAndDelete(did);
        res.json({
            ok: true,
            msg: 'Dependiente eliminado'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en eliminarDependiente'
        });
    }
};
module.exports = {
   getDependientes,
   crearDependiente,
   eliminarDependiente
};
