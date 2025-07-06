/*
require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Importa modelos
const Estado = require('../models/estado.model');
const Ciudad = require('../models/ciudad.model');
const Municipio = require('../models/municipio.model');
const Parroquia = require('../models/parroquia.model');

// Carga datos desde archivos JSON
const loadJSON = (file) => {
  const dataPath = path.join(__dirname, file);
  console.log(`Buscando archivo en: ${dataPath}`);
  if (!fs.existsSync(dataPath)) {
    throw new Error(`Archivo ${file} no encontrado. Ruta: ${dataPath}`);
  }
  return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
};

const seedDatabase = async () => {
  try {
    if (!process.env.DB_CONN) {
      throw new Error('La variable DB_CONN no está definida en .env');
    }

    console.log('Conectando a MongoDB...');
    await mongoose.connect(process.env.DB_CONN);
    console.log('✔️ Conexión exitosa a MongoDB');

    console.log('Borrando datos existentes...');
    await Promise.all([
      Estado.deleteMany({}),
      Ciudad.deleteMany({}),
      Municipio.deleteMany({}),
      Parroquia.deleteMany({})
    ]);
    console.log('🗑️ Datos existentes borrados.');

    console.log('Cargando datos iniciales...');
    const data = {
      estados: loadJSON('../scripts/estado.json'), // Rutas relativas a scripts/
      ciudades: loadJSON('../scripts/ciudad.json'),
      municipios: loadJSON('../scripts/municipio.json'),
      parroquias: loadJSON('../scripts/parroquia.json')
    };

    // --- Paso 1: Insertar Estados y mapear IDs originales a _id de MongoDB ---
    console.log(`Insertando ${data.estados.length} estados...`);
    const insertedEstados = await Estado.insertMany(data.estados);
    const estadoIdMap = new Map(); // Mapa: id_estado_original -> _id_mongo
    insertedEstados.forEach(estado => {
      // Asume que tu JSON original de estado tiene un campo como 'id_estado'
      // Si tu estado.json solo tiene "nombre_estado", necesitarías un campo adicional para el ID original
      // o usar el índice si los IDs son 1, 2, 3...
      // Basado en tu venezuela.json, el id_estado ya existe.
      estadoIdMap.set(String(estado.id_estado), estado._id); // Asegura que la clave sea string para consistencia
    });
    console.log('✅ Estados insertados.');

    // --- Paso 2: Preparar e insertar Ciudades ---
    console.log(`Insertando ${data.ciudades.length} ciudades...`);
    const ciudadesToInsert = data.ciudades.map(ciudad => {
      const newCiudad = { ...ciudad };
      // Aquí asumes que tu ciudad.json tiene un campo 'id_estado' que corresponde
      // al 'id_estado' original de tu venezuela.json.
      // Reemplaza el id_estado "numérico" por el ObjectId real del estado.
      if (!estadoIdMap.has(String(newCiudad.id_estado))) {
        throw new Error(`ID de estado ${newCiudad.id_estado} no encontrado para la ciudad ${newCiudad.nombre_ciudad}`);
      }
      newCiudad.id_estado = estadoIdMap.get(String(newCiudad.id_estado));
      return newCiudad;
    });
    const insertedCiudades = await Ciudad.insertMany(ciudadesToInsert);
    const ciudadIdMap = new Map(); // Mapa: id_ciudad_original (si existe) -> _id_mongo
    // Si tus ciudades no tienen un ID original único en el JSON,
    // puedes usar el nombre de la ciudad como clave de mapeo temporal,
    // o el índice de inserción si sabes que corresponden.
    // Para el ejemplo de ciudad.json que diste, no hay 'id' en ciudad.json,
    // lo que hace el mapeo más complejo.
    // Necesitas un campo en ciudad.json que te permita vincularlo
    // con el id_ciudad en municipio.json.
    // Por simplicidad, si "id_ciudad" en municipio.json se refiere al índice de ciudad.json,
    // o al orden de inserción de ciudades, el mapeo se vuelve muy frágil.

    // ************* REVISAR AQUÍ *************
    // Tu `municipio.json` tiene `id_ciudad`.
    // Tu `ciudad.json` no tiene un `id` propio, solo `id_estado`.
    // Si `id_ciudad` en `municipio.json` es un ID generado por ti (1, 2, 3...),
    // entonces tu `ciudad.json` *también* necesita ese ID para poder mapearlo.
    // Por ejemplo:
    // ciudad.json: { "id": 1, "nombre_ciudad": "Puerto Ayacucho", "id_estado": "1" }
    // Deberías modificar `ciudad.json` para incluir esos IDs que esperas en `municipio.json`.
    // Si lo haces así, este mapeo sería:
    insertedCiudades.forEach(ciudad => {
      // Asume que tu ciudad.json tiene un campo 'id' que es el "id_ciudad" original
      // que usas en municipio.json. Si no, ¡necesitas añadirlo a tu ciudad.json!
      if (ciudad.id) { // Solo si tu JSON de ciudad tiene un campo 'id' original
        ciudadIdMap.set(String(ciudad.id), ciudad._id);
      } else {
        // Alternativa: Si 'id' no existe, usar el nombre y el id_estado para crear una clave única
        // Esto es más propenso a errores si hay ciudades con el mismo nombre en diferentes estados
        ciudadIdMap.set(`${ciudad.nombre_ciudad}-${ciudad.id_estado.toString()}`, ciudad._id);
      }
    });
    console.log('✅ Ciudades insertadas.');

    // --- Paso 3: Preparar e insertar Municipios ---
    console.log(`Insertando ${data.municipios.length} municipios...`);
    const municipiosToInsert = data.municipios.map(municipio => {
      const newMunicipio = { ...municipio };
      // Aquí, id_ciudad en el JSON de municipio debe ser el ID original (ej. 1, 2)
      // que ahora mapeamos al ObjectId real de la ciudad.
      let mappedCiudadId;
      if (typeof newMunicipio.id_ciudad === 'string' || typeof newMunicipio.id_ciudad === 'number') {
         // Si tu `ciudad.json` fue modificado para tener un campo `id` como en mi sugerencia anterior:
         mappedCiudadId = ciudadIdMap.get(String(newMunicipio.id_ciudad));
      } else {
          // Si no tienes un `id` en `ciudad.json` y dependes de nombres + id_estado:
          // Esto es más complejo y propenso a errores si la lógica de generación no es estricta.
          // Necesitarías la `id_estado` del municipio o buscar la ciudad por nombre y estado.
          // Para simplificar, ASUMO que tu `ciudad.json` AHORA tendrá un campo `id`
          // que corresponde al `id_ciudad` en tu `municipio.json`.
          throw new Error('Para un mapeo robusto, ciudad.json debe tener un campo "id" que corresponda a id_ciudad en municipio.json.');
      }

      if (!mappedCiudadId) {
        throw new Error(`ID de ciudad ${newMunicipio.id_ciudad} no encontrado para el municipio ${newMunicipio.nombre_municipio}. Asegúrate de que ciudad.json tenga un campo 'id' que coincida.`);
      }
      newMunicipio.id_ciudad = mappedCiudadId;
      return newMunicipio;
    });
    const insertedMunicipios = await Municipio.insertMany(municipiosToInsert);
    const municipioIdMap = new Map(); // Mapa: id_municipio_original -> _id_mongo
    // Aquí asumo que tu `municipio.json` tiene un campo `id_municipio` que es el ID original
    // que luego referenciarás en `parroquia.json`.
    insertedMunicipios.forEach(municipio => {
      if (municipio.id_municipio) { // Asume que municipio.json tiene un campo 'id_municipio'
        municipioIdMap.set(String(municipio.id_municipio), municipio._id);
      } else {
        // Alternativa: Si no, necesitarías una clave única (nombre + id_ciudad)
        municipioIdMap.set(`${municipio.nombre_municipio}-${municipio.id_ciudad.toString()}`, municipio._id);
      }
    });
    console.log('✅ Municipios insertados.');

    // --- Paso 4: Preparar e insertar Parroquias ---
    console.log(`Insertando ${data.parroquias.length} parroquias...`);
    const parroquiasToInsert = data.parroquias.map(parroquia => {
      const newParroquia = { ...parroquia };
      const mappedMunicipioId = municipioIdMap.get(String(newParroquia.id_municipio));

      if (!mappedMunicipioId) {
        throw new Error(`ID de municipio ${newParroquia.id_municipio} no encontrado para la parroquia ${newParroquia.nombre_parroquia}.`);
      }
      newParroquia.id_municipio = mappedMunicipioId;
      return newParroquia;
    });
    await Parroquia.insertMany(parroquiasToInsert);
    console.log('✅ Parroquias insertadas.');

    console.log('✅ Precarga completada exitosamente!');
  } catch (error) {
    console.error('❌ Error durante la precarga:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

// Ejecución con manejo de errores no capturados
process.on('unhandledRejection', (err) => {
  console.error('Error no capturado:', err);
  process.exit(1);
});

seedDatabase();*/


/*para comprobar que esta pasando*/
// scripts/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Importa modelos
const Estado = require('../models/estado.model');
const Ciudad = require('../models/ciudad.model');
const Municipio = require('../models/municipio.model');
const Parroquia = require('../models/parroquia.model');

// Carga datos desde archivos JSON
const loadJSON = (file) => {
  const dataPath = path.join(__dirname, file);
  console.log(`Buscando archivo en: ${dataPath}`);
  if (!fs.existsSync(dataPath)) {
    throw new Error(`Archivo ${file} no encontrado. Ruta: ${dataPath}`);
  }
  return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
};

const seedDatabase = async () => {
  try {
    if (!process.env.DB_CONN) {
      throw new Error('La variable DB_CONN no está definida en .env');
    }

    console.log('Conectando a MongoDB...');
    await mongoose.connect(process.env.DB_CONN);
    console.log('✔️ Conexión exitosa a MongoDB');

    console.log('Borrando datos existentes...');
    await Promise.all([
      Estado.deleteMany({}),
      Ciudad.deleteMany({}),
      Municipio.deleteMany({}),
      Parroquia.deleteMany({})
    ]);
    console.log('🗑️ Datos existentes borrados.');

    console.log('Cargando datos iniciales...');
    const data = {
      estados: loadJSON('../scripts/estado.json'), // Rutas relativas a scripts/
      ciudades: loadJSON('../scripts/ciudad.json'),
      municipios: loadJSON('../scripts/municipio.json'),
      parroquias: loadJSON('../scripts/parroquia.json')
    };

    // --- Paso 1: Insertar Estados y mapear IDs originales a _id de MongoDB ---
    console.log(`Insertando ${data.estados.length} estados...`);
    const insertedEstados = await Estado.insertMany(data.estados);
    const estadoIdMap = new Map(); // Mapa: id_estado_original -> _id_mongo
    insertedEstados.forEach(estado => {
      estadoIdMap.set(String(estado.id_estado), estado._id);
    });
    console.log('✅ Estados insertados.');

    // --- Paso 2: Preparar e insertar Ciudades ---
    console.log(`Insertando ${data.ciudades.length} ciudades...`);
    const ciudadesToInsert = data.ciudades.map(ciudad => {
      const newCiudad = { ...ciudad };
      if (!estadoIdMap.has(String(newCiudad.id_estado))) {
        throw new Error(`ID de estado ${newCiudad.id_estado} no encontrado para la ciudad ${newCiudad.nombre_ciudad}`);
      }
      newCiudad.id_estado = estadoIdMap.get(String(newCiudad.id_estado));
      return newCiudad;
    });
    const insertedCiudades = await Ciudad.insertMany(ciudadesToInsert);
    const ciudadIdMap = new Map(); // Mapa: id_ciudad_original -> _id_mongo

    insertedCiudades.forEach(ciudad => {
      // CORRECCIÓN: Usar ciudad.id_ciudad que es el campo real en tu modelo y JSON
      if (ciudad.id_ciudad) {
        ciudadIdMap.set(String(ciudad.id_ciudad), ciudad._id);
      } else {
        // Esta rama solo se ejecutaría si id_ciudad no se guardó por alguna razón (ej. error en modelo anterior)
        // o si tus JSONs no siempre garantizan id_ciudad. Debería ser muy raro ahora.
        console.warn(`ADVERTENCIA: Ciudad ${ciudad.nombre_ciudad} no tiene id_ciudad, usando nombre y estado como fallback para el mapeo.`);
        ciudadIdMap.set(`${ciudad.nombre_ciudad}-${ciudad.id_estado.toString()}`, ciudad._id);
      }
    });
    console.log('✅ Ciudades insertadas.');

    // --- Paso 3: Preparar e insertar Municipios ---
    console.log(`Insertando ${data.municipios.length} municipios...`);
    const municipiosToInsert = data.municipios.map(municipio => {
      const newMunicipio = { ...municipio };
      
      let mappedCiudadId;
      if (typeof newMunicipio.id_ciudad === 'string' || typeof newMunicipio.id_ciudad === 'number') {
           mappedCiudadId = ciudadIdMap.get(String(newMunicipio.id_ciudad));
      } else {
           throw new Error('Para un mapeo robusto, id_ciudad en municipio.json debe ser un número o string que corresponda a id_ciudad en ciudad.json.');
      }

      if (!mappedCiudadId) {
        throw new Error(`ID de ciudad ${newMunicipio.id_ciudad} no encontrado para el municipio ${newMunicipio.nombre_municipio}. Asegúrate de que ciudad.json tenga un campo 'id_ciudad' que coincida.`);
      }
      newMunicipio.id_ciudad = mappedCiudadId;
      return newMunicipio;
    });
    const insertedMunicipios = await Municipio.insertMany(municipiosToInsert);
    const municipioIdMap = new Map(); // Mapa: id_municipio_original -> _id_mongo
    
    insertedMunicipios.forEach(municipio => {
      // Asume que municipio.json tiene un campo 'id_municipio' que es el ID original
      if (municipio.id_municipio) { 
        municipioIdMap.set(String(municipio.id_municipio), municipio._id);
      } else {
        // Alternativa: Si no, necesitarías una clave única (nombre + id_ciudad)
        console.warn(`ADVERTENCIA: Municipio ${municipio.nombre_municipio} no tiene id_municipio, usando nombre y ciudad como fallback para el mapeo.`);
        municipioIdMap.set(`${municipio.nombre_municipio}-${municipio.id_ciudad.toString()}`, municipio._id);
      }
    });
    console.log('✅ Municipios insertados.');

    // --- Paso 4: Preparar e insertar Parroquias ---
    console.log(`Insertando ${data.parroquias.length} parroquias...`);
    const parroquiasToInsert = data.parroquias.map(parroquia => {
      const newParroquia = { ...parroquia };
      const mappedMunicipioId = municipioIdMap.get(String(newParroquia.id_municipio));

      if (!mappedMunicipioId) {
        throw new Error(`ID de municipio ${newParroquia.id_municipio} no encontrado para la parroquia ${newParroquia.nombre_parroquia}.`);
      }
      newParroquia.id_municipio = mappedMunicipioId;
      return newParroquia;
    });
    await Parroquia.insertMany(parroquiasToInsert);
    console.log('✅ Parroquias insertadas.');

    console.log('✅ Precarga completada exitosamente!');
  } catch (error) {
    console.error('❌ Error durante la precarga:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

// Ejecución con manejo de errores no capturados
process.on('unhandledRejection', (err) => {
  console.error('Error no capturado:', err);
  process.exit(1);
});

seedDatabase();

/**fin */