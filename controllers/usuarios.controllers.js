const { response } = require('express');
const bcrypt = require( 'bcryptjs' );


const getUsuarios= (req, res) => {
    res.json({
        ok:true,
        usuarios: []
    });
}

const crearUsuario = async (req, res = response) => {
    res.json({
        ok:true,
        msg:'Creando usuario...'
    });
}

const editarUsuario = async (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Editando usuario...'
    })
}


const borrarUsuario = async (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Usuario borrado...'
    });
}


module.exports = {
    getUsuarios,
    crearUsuario,
    editarUsuario,
    borrarUsuario
}