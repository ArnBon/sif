const {router} = require('express');
//const { getSolicitudCobertura, getSolicitudCoberturaId, crearSolicitudCobertura, actualizarSolicitudCobertura, eliminarSolicitudCobertura } = require('../controllers/solicitud_cobertura.controller');

const router = Router();

router.get('/', (req, res) => {
  res.send('Lista de solicitudes de cobertura');
});         

router.get('/:id', (req, res) => {
  res.send(`Detalles de la solicitud de cobertura con ID: ${req.params.id}`);
});

router.post('/', (req, res) => {
  res.send('Crear una nueva solicitud de cobertura');
});

router.put('/:id', (req, res) => {
  res.send(`Actualizar la solicitud de cobertura con ID: ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
  res.send(`Eliminar la solicitud de cobertura con ID: ${req.params.id}`);
});

module.exports = router;
