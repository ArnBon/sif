const mongoose = require('mongoose');
const Genero = require('./models/Genero');
const EstadoCivil = require('./models/EstadoCivil');
const TipoPersona = require('./models/TipoPersona');

const datosIniciales = async () => {
  // Precargar Géneros
  await Genero.deleteMany();
  await Genero.insertMany([
    { descripcion: 'Masculino', codigo: 'M' },
    { descripcion: 'Femenino', codigo: 'F' },
    { descripcion: 'Otro', codigo: 'O' }
  ]);

  // Precargar Estados Civiles
  await EstadoCivil.deleteMany();
  await EstadoCivil.insertMany([
    { descripcion: 'Soltero', codigo: 'S' },
    { descripcion: 'Casado', codigo: 'C' },
    { descripcion: 'Viudo', codigo: 'V' },
    { descripcion: 'Divorciado', codigo: 'D' }
  ]);

  // Precargar Tipos de Persona
  await TipoPersona.deleteMany();
  await TipoPersona.insertMany([
    { descripcion: 'Beneficiario', codigo: 'B' },
    { descripcion: 'Familiar', codigo: 'F' },
    { descripcion: 'Médico', codigo: 'M' },
    { descripcion: 'Dependiente', codigo: 'D' },
    { descripcion: 'Titular', codigo: 'T' }
  ]);

  console.log('Datos precargados exitosamente!');
  mongoose.disconnect();
};

mongoose.connect('mongodb://localhost:27017/tudatabase', datosIniciales);