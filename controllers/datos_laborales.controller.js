const { response } = require('express');
const DatosLaborales = require('../models/datos_laborales.model');
const Persona = require('../models/personas.model');


const getdatosLaborales = async (req, res = response) => {
    try {
        // Obtener todos los datos laborales
        const datosLaborales = await DatosLaborales.find({}, 'id_datos_laboral id_persona profesion ocupacion actividad_economica ingreso_anual empresa_trabaja fecha_ingreso');
        res.json({
            ok: true,
            datosLaborales // Devuelve la lista de datos laborales
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los datos laborales.'
        });        
    }   
}



const getdatosLaboralesId = async (req, res = response) => {
    const dlid = req.params.id;
    try {
        const datoLaboralDB = await DatosLaborales.findById(dlid)
            .populate('id_persona', 'primer_nombre segundo_nombre primer_apellido segundo_apellido')
            

        if (!datoLaboralDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existen datos laborales por ese ID.'
            });
        }

        res.json({
        ok:true,
        datoLaboralDB, // Devuelve el objeto encontrado
        msg: 'Obtener datos laborales por Id'

    });

        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los datos laborales por ID.'
        });
        
    }
    
}



const creardatosLaborales = async (req, res = response) => {

    const datosLaborales = new DatosLaborales(req.body); // Crear el objeto DatosLaborales
    try {
    await datosLaborales.save(); // Guardar en la base de datos
    res.json({
        ok: true,
        msg: 'Datos laborales creados correctamente',
        datosLaborales // Devuelve el objeto creado
    });    
} catch (error) {
    console.error(error);
    res.status(500).json({
        ok: false,
        msg: 'Error al crear los datos laborales.'
    });    
   }    
}



const actualizardatosLaborales = async (req, res = response) => {
    const dlid = req.params.id;

    try {
        //encuentra los datos laborales por ID
        const datosLaboralesDB = await DatosLaborales.findById(dlid)
        if (!datosLaboralesDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existen datos laborales por ese ID.'
            });
        }
        //2.- Actualiza el registro por ese dlid
        const campos = req.body;

        //2.2.- elimianr campos que no se pueden actualizar
        //delete campos.profesion //este es un ejemplo realmente no lo necesito

        //3.- Actuzlizar el dato laboral en la bd
        const datosLaboralesActualizados = await DatosLaborales.findByIdAndUpdate(dlid, campos, { new: true });
        res.json({
            ok: true,
            msg: 'Datos laborales actualizados correctamente',
            datosLaborales: datosLaboralesActualizados // Devuelve el objeto actualizado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar los datos laborales.'
        });        
    }    
}



const eliminardatosLaborales = async (req, res = response) => {
     const dlid = req.params.id;
     try {
        //1.- Encuentra los datos laborales por ID
        //encuentra los datos laborales por ID
        const datosLaboralesDB = await DatosLaborales.findById(dlid)
        
        if (!datosLaboralesDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existen datos laborales por ese ID.'
            });
        }
        //2.- Elimina el registro por ese dlid
        await DatosLaborales.findByIdAndDelete(dlid);

        res.json({
        ok:true,
        msg: 'Eliminar datos laborales'
    });
        
     } catch (error) {
            console.error(error);
            res.status(500).json({
                ok: false,
                msg: 'Error al eliminar los datos laborales.'
            });
        }
     }


module.exports = {
    getdatosLaborales,
    getdatosLaboralesId,
    creardatosLaborales,
    actualizardatosLaborales,
    eliminardatosLaborales
}