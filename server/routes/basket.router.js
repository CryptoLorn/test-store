const Router = require('express');

const basketController = require('../controllers/basket.controller');

const router = new Router();

router.get('/:id', basketController.getById);

module.exports = router;
