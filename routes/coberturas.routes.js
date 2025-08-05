const { Router } = require('express');
//const { getCoberturas, getCoberturaId, crearCobertura, actualizarCobertura, eliminarCobertura } = require('../controllers/coberturas.controller');


const router = Router();

router.get('/', (req, res) => {
  res.send('Lista de coberturas');
});

/*router.get('/:id', (req, res) => {
  res.send(`Detalles de la cobertura con ID: ${req.params.id}`);            
});*/

router.post('/', (req, res) => {
    res.send('Crear una nueva cobertura');
    }); 

    router.put('/:id', (req, res) => {
        res.send(`Actualizar la cobertura con ID: ${req.params.id}`);
    });

    router.delete('/:id', (req, res) => {
        res.send(`Eliminar la cobertura con ID: ${req.params.id}`);
    });

    module.exports = router;
