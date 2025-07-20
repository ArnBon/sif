const { response } = require('express');
const Direccion = require('../models/direcciones.model');
const Persona = require('../models/personas.model');


//crear direccion puede ser usada por una o multiples personas ademas de ser compatible
const crearDireccion = async (req, res = response) => {
    
    const direccion = new Direccion(req.body);
    try {
        await direccion.create(req.body);
        res.status(201).json({
            ok: true,
            direccion
        });
    } catch (error) {
        console.log('Error al guardar direccion', error)
        res.status(500).json({
            ok:false,
            msg: 'Error interno del servidor',
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
};



//vincular esa direccion creada a una persona puede ser un grupo familiar
const vincularDireccionPersona = async (req, res) => {
    try {
        const { personaId } = req.params;
        const { direccionId, tipo = 'casa' } = req.body;
        
        //2.1 verificar si la persona existe
        const [persona, direccion] = await Promise.all([
            Persona.findById(personaId),
            Direccion.findById(direccionId)
        ]);
        if (!persona) {
            return res.status(404).json({
                ok: false,
                msg: 'Persona no encontrada'
            });
        } 
        //2.2 evitar duplicados
        const yaExiste = persona.direcciones.some(d => d.direccion.toString() === direccionId);
        if (yaExiste) {
            return res.status(400).json({
                ok: false,
                msg: 'La direccion ya esta vinculada a la persona'
            });
        }

        //2.3 vincular        
        persona.direcciones.push({ direccion: direccionId, tipo });
        await persona.save();
        
        res.json({
            ok: true,
            persona: await Persona.findById(personaId)
                .populate('direcciones.direccion', 'calle numero ciudad pais')
        });
        
    } catch (error) {
        res.json({
            ok:true,
            msg: 'Hable con el administrador'
        });        
    }
}
module.exports = {
    
    crearDireccion,
    vincularDireccionPersona
   
}