const { Router } = require('express');
//const { getCoberturas, getCoberturaId, crearCobertura, actualizarCobertura, eliminarCobertura } = require('../controllers/coberturas.controller');

const router = Router();

router.get('/', (req, res) => {
  res.send('Lista de servicios contratados');
});

router.get('/:id', (req, res) => {
  res.send(`Detalles del servicio contratado con ID: ${req.params.id}`);
});

router.post('/', (req, res) => {
  res.send('Crear un nuevo servicio contratado');
});

router.put('/:id', (req, res) => {
  res.send(`Actualizar el servicio contratado con ID: ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
  res.send(`Eliminar el servicio contratado con ID: ${req.params.id}`);
});

module.exports = router;
