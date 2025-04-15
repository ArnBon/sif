require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

// 1.- crear el servidor de express
const app = express();

// 2. cors es un middleware que se ejecuta desde aqui hacia abajo
app.use( cors() );

// 3.- ejecuta BD
dbConnection();

// creando las rutas del servicio
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola mundo!'
    });

}); 

// 4. Se crean las Rutas



// 5.- ejecutar el servidor
app.listen(3000, () => {
console.log('Servidor on-line' + 3000);
});
