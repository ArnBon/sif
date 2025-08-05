const { Router } = require('express');
//const { getPlanes, getPlanId, crearPlan, actualizarPlan, eliminarPlan } = require('../controllers/planes.controller');

const router = Router();

router.get('/', (req, res) => {
  res.send('Lista de planes');
});

/*router.get('/:id', (req, res) => {
  res.send(`Detalles del plan con ID: ${req.params.id}`);
});*/

router.post('/', (req, res) => {
  res.send('Crear un nuevo plan');
});

router.put('/:id', (req, res) => {
  res.send(`Actualizar el plan con ID: ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
  res.send(`Eliminar el plan con ID: ${req.params.id}`);
});

module.exports = router;
