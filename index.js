require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

// 1.- crear el servidor de express
const app = express();

// 2. cors es un middleware que se ejecuta desde aqui hacia abajo
app.use( cors() );

// 3. lectura y parseo del body del postman o endpoint
app.use(express.json());

// 4.- ejecuta BD
dbConnection();

// 5. Se crean las Rutas C.R.U.D.
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/permisos', require('./routes/permisos.routes'));
app.use('/api/roles', require('./routes/roles.routes'));
app.use('/api/personas', require('./routes/personas.routes'));
app.use('/api/direccion', require('./routes/direcciones.routes'));
app.use('/api/telefono', require('./routes/telefono.routes'));
app.use('/api/datoslaborales', require('./routes/datos_laborales.routes'));

// modulo declaracion de salud 
app.use('/api/planes', require('./routes/planes.routes'));
app.use('/api/coberturas', require('./routes/coberturas.routes'));
app.use('/api/servicioscontratados', require('./routes/servicios_contratados.routes'));
app.use('/api/solicitudcobertura', require('./routes/solicitud_cobertura.routes'));
app.use('/api/personasplanes', require('./routes/personas_planes.routes'));
app.use('/api/tiposeguro', require('./routes/tipos_seguro.routes'));
//fin modulo declaracion de salud


// 5.1 Seguridad de la aplicacion
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/assignRol', require('./routes/assign_rol.routes'));
app.use('/api/assignPermiso', require('./routes/assign_permiso.routes'));

//Recuperacion de contraseña la ruta cambia porque se usa en un mismo archivo
app.use('/api/auth', require('./routes/auth.routes'));


// 6.- ejecutar el servidor
app.listen(process.env.PORT, () => {
console.log('Servidor on-line' + process.env.PORT);
});
