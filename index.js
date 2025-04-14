require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

const app = express();

app.use( cors() );

app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola mundo!'
    });

});  

app.listen(3000, () => {
console.log('Servidor on-line' + 3000);
});
