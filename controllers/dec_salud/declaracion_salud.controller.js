const { response } = require('express');
const DeclaracionSalud = require('../../models/declaracion_salud.model');
const Persona = require('../../models/personas.model');
const EdoSalud = require('../../models/estado_salud.model');
const Usuario = require('../../models/usuarios.models');  



 const getDeclaracionSalud = async (req, res = response) => {
    try {
        //Obtener todas las declaraciones de salud
        const declaracion_salud = await DeclaracionSalud.find({}, 'id_declaracion id_persona id_edo_salud fecha_declaracion observaciones fecha_creacion usuario_creacion' );
        res.json({
            ok:true,
            declaracion_salud
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al encontrar declaraciones'
        });        
    }
 }  


 const getDeclaracionSaludId = async (req, res = response) => {
    const dsid = req.params.id;

    try {
        //Encuentro las declaraciones por el id
        const declaracionDB = await DeclaracionSalud.findById(dsid)
        .populate('id_persona')
        .populate('id_edo_salud')
        
        if(!declaracionDB){
            return res.status(404).json({
                ok:false,
                declaracionDB
            });
        }        
        res.json({
            ok:true,
            declaracionDB
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al encontrar declaraciones'
        });        
    }
 }

 const crearDeclaracionSalud = async (req, res = response) => {
    const declaracionSalud = new DeclaracionSalud(req.body);
    try {
        await declaracionSalud.save();        
        res.json({
            ok:true,
            msg: 'Declaracion de salud creada satisfactoriamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al crear declaracion',
            error
        });        
    }
 }

 const actualizarDeclaracionSalud = async (req, res = response) => {
    const dsid = req.params.id;
    try {
        const declaracionDB = await DeclaracionSalud.findById(dsid);
        if(!declaracionDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe declaracion por ese ID'
            });
        }
        //2.- actualiza el resitro por ese pid        
        const campos = req.body; //son los campos del endpoint | postman

        //eliminar campos que no quiero actualizar
        delete campos.usuario_creacion;

        //actualizar la declaracion como tal
        const edicionDeclaracion = await DeclaracionSalud.findByIdAndUpdate(dsid, campos, {new: true});
        res.json({
            ok:true,
            message: 'Declaracion de Salud editada correctamente'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al encontrar declaraciones'
        });        
    }
 }

 const eliminarDeclaracionSalud = async (req, res = response) => {
    const dsid = req.params.id;
    
    try {
        const declaracionDB = await DeclaracionSalud.findById(dsid);
        if(!declaracionDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe declaracion por ese ID'
            });
        } 
        //elimina el registro como tal
        await DeclaracionSalud.findByIdAndDelete(dsid)       
        res.json({
            ok:true,
            message: 'Registro Eliminado'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al encontrar declaaciones'
        });        
    }
 }

 
const getDeclaracionesByPersona = async (req, res = response) => {
    const idPersona = req.params.idPersona;

    try {
        // Encuentro las declaraciones por el id_persona
        const declaracionesDB = await DeclaracionSalud.find({ id_persona: idPersona })
            .populate('id_persona')
            .populate('id_edo_salud')
            .populate('usuario_creacion')
            .sort({ fecha_declaracion: -1 });
        
        if(!declaracionesDB || declaracionesDB.length === 0){
            return res.status(404).json({
                ok: false,
                msg: 'No se encontraron declaraciones para esta persona'
            });
        }        
        res.json({
            ok: true,
            declaraciones: declaracionesDB,
            count: declaracionesDB.length
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener declaraciones de la persona'
        });        
    }
}

const updateDeclaracionesByPersona = async (req, res = response) => {
    const idPersona = req.params.idPersona;
    const { id_edo_salud, observaciones, fecha_declaracion } = req.body;

    try {
        // Actualizar TODAS las declaraciones de la persona
        const result = await DeclaracionSalud.updateMany(
            { id_persona: idPersona },
            { 
                $set: { 
                    ...(id_edo_salud && { id_edo_salud }),
                    ...(observaciones && { observaciones }),
                    ...(fecha_declaracion && { fecha_declaracion })
                } 
            }
        );

        if(result.matchedCount === 0){
            return res.status(404).json({
                ok: false,
                msg: 'No se encontraron declaraciones para esta persona'
            });
        }

        res.json({
            ok: true,
            msg: `Se actualizaron ${result.modifiedCount} declaraciones`,
            data: result
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar declaraciones'
        });        
    }
}


module.exports = {
     getDeclaracionSalud, 
     getDeclaracionSaludId, 
     crearDeclaracionSalud,
     actualizarDeclaracionSalud,
     eliminarDeclaracionSalud,
     getDeclaracionesByPersona,// ← Nuevo
     updateDeclaracionesByPersona 
}