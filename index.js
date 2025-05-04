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

// 5.1 Seguridad de la aplicacion
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/assignRol', require('./routes/assign_rol.routes'));
app.use('/api/assignPermiso', require('./routes/assign_permiso.routes'));    



// 6.- ejecutar el servidor
app.listen(process.env.PORT, () => {
console.log('Servidor on-line' + process.env.PORT);
});
