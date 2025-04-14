const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.connect(process.env.DB_CONN));
        console.log('BD On-line...')
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la BD del SIF');        
    }
}

module.exports = {
    dbConnection
}