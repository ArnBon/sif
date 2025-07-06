// scripts/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Importa modelos
const Genero = require('../models/genero.model');
const EstadoCivil = require('../models/estado_civil.model');
const TipoPersona = require('../models/tipo_persona.model');

// Carga datos desde archivos JSON
const loadJSON = (file) => {
  const dataPath = path.join(__dirname, file);
  console.log(`Buscando archivo en: ${dataPath}`); // Para diagnóstico
  if (!fs.existsSync(dataPath)) {
    throw new Error(`Archivo ${file} no encontrado. Ruta: ${dataPath}`);
  }
  return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
};

const seedDatabase = async () => {
  try {
    //verificamos que la variable este cargada
    if (!process.env.DB_CONN){
      throw new Error('La variable DBCONN no está definida en .env');      
    }   
    
    // Conexión a MongoDB
    console.log('Conectando a MongoDB...');
    await mongoose.connect(process.env.DB_CONN);
    console.log('✔️ Conexión exitosa a MongoDB');

    // Precargar datos aqui busca los json sino no va a funcionar
    console.log('Cargando datos iniciales...');
    const data = {
      generos:        loadJSON('../scripts/generos.json'),
      estadosCiviles: loadJSON('../scripts/estados_civiles.json'),
      tiposPersona:   loadJSON('../scripts/tipos_persona.json')
    };

    await Promise.all([
      Genero.deleteMany().then(() => {
        console.log(`Insertando ${data.generos.length} géneros`);
        return Genero.insertMany(data.generos);
      }),
      EstadoCivil.deleteMany().then(() => {
        console.log(`Insertando ${data.estadosCiviles.length} estados civiles`);
        return EstadoCivil.insertMany(data.estadosCiviles);
      }),
      TipoPersona.deleteMany().then(() => {
        console.log(`Insertando ${data.tiposPersona.length} tipos de persona`);
        return TipoPersona.insertMany(data.tiposPersona);
      })
    ]);


    console.log('✅ Precarga completada exitosamente!');
  } catch (error) {
    console.error('❌ Error durante la precarga:', error.message);
    process.exit(1); // Finaliza con código de error
  } finally {
    await mongoose.disconnect();
    process.exit(0); // Finalización limpia
  }
};

// Ejecución con manejo de errores no capturados
process.on('unhandledRejection', (err) => {
  console.error('Error no capturado:', err);
  process.exit(1);
});

seedDatabase();