const { response } = require('express');
const Telefono = require('../models/telefono.model');
const Persona = require('../models/personas.model');


//crear telefono puede ser usado por una o multiples personas ademas de ser compatible
const crearTelefono = async (req, res = response) => {
    const telefono = new Telefono(req.body);
    try {
        //auto detectar operadora si es movil
         if (req.body.tipo_telefono === 'movil') {
            const prefix = req.body.numero.substring(0, 4);
            const operadoras = {
                '0412': 'digitel',
                '0414': 'movistar',
                '0424': 'telefonica',
                '0416': 'movilnet'
            };
            req.body.operadora = operadoras[prefix];            
         }
         const telefono = await Telefono.create(req.body);
        res.status(201).json({
            ok: true,
            telefono
        });

    } catch (error) {
        console.error('Error al crear teléfono:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor',
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
};


//vincular ese telefono creado a una persona puede ser un grupo familiar
const vincularTelefonoPersona = async (req, res) => {
    try {
        const { personaId } = req.params;
        const { telefonoId, tipo = 'principal' } = req.body;
        
        //1.1 verificar si la persona existe
        const [persona, telefono] = await Promise.all([
            Persona.findById(personaId),
            Telefono.findById(telefonoId)
        ]);
        if (!persona || !telefono) {
            return res.status(404).json({
                ok: false,
                msg: 'Persona o teléfono no encontrado' 
            });
        } 
        //1.2 evitar duplicados
        const yaExisteTel = persona.telefonos.some(t => t.telefono.toString() === telefonoId);
        if (yaExisteTel) {
            return res.status(400).json({
                ok: false,
                msg: 'El telefono ya esta vinculado a la persona'
            });
        }

        //1.3 vincular        
        persona.telefonos.push({ telefono: telefonoId, tipo_telefono: tipo });
        await persona.save();
        
        res.json({
            ok: true,
            persona: await Persona.findById(personaId).populate('telefonos.telefono')
        });

    } catch (error) {
        console.error('Error al vincular teléfono:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor'
        });
    }
};


module.exports = {    
    crearTelefono,
    vincularTelefonoPersona    
}
