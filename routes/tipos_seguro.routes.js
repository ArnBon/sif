const { Router } = require('express');
const { getCoberturas } = require('../controllers/coberturas.controller');



const router = Router();

router.get('/', getCoberturas);


module.exports = router;




