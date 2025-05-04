const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {
    return new Promise( (resolve, reject) => {
        const payload = {
            uid,
        };
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '6h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se generó el Json Web Token');                
            } else {
                resolve( token );
            }
        });
    });
}

module.exports = {
    generarJWT,
}