const { Router } = require('express');
//const { getCoberturas, getCoberturaId, crearCobertura, actualizarCobertura, eliminarCobertura } = require('../controllers/coberturas.controller');



const router = Router();

router.get('/', (req, res) => {
  res.send('Lista de tipos de seguro');
});    

router.get('/:id', (req, res) => {
  res.send(`Detalles del tipo de seguro con ID: ${req.params.id}`);
});


router.post('/', (req, res) => {
    res.send('Crear un nuevo tipo de seguro');
});


router.put('/:id', (req, res) => {
    res.send(`Actualizar el tipo de seguro con ID: ${req.params.id}`);
}); 

router.delete('/:id', (req, res) => {
    res.send(`Eliminar el tipo de seguro con ID: ${req.params.id}`);
}); 

module.exports = router;




