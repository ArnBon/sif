const { Router } = require('express');
const {getTiposIntervencion} = require();

const router = Router();

router.get('/', getTiposIntervencion);

module.exports = router;