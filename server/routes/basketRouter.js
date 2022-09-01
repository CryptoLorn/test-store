const Router = require('express');

const basketController = require('../controllers/basketController');

const router = new Router();

router.get('/', basketController.getAll);

module.exports = router;
