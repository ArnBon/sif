const { Router } = require('express');
const {getTiposCondicionSalud} = require();

const router = Router();

router.get('/', getTiposCondicionSalud);


module.exports = router;