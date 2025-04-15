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

// 5. Se crean las Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'))


// 6.- ejecutar el servidor
app.listen(process.env.PORT, () => {
console.log('Servidor on-line' + process.env.PORT);
});
