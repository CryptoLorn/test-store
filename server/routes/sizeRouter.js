const Router = require('express');

const sizeController = require('../controllers/size.controller');

const router = new Router();

router.get('/', sizeController.getAll);
router.post('/', sizeController.create);

module.exports = router;
