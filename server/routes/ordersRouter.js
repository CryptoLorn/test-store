const Router = require('express');

const ordersController = require('../controllers/ordersController');

const router = new Router();

router.get('/', ordersController.getAll);
router.post('/', ordersController.create);
router.delete('/:id', ordersController.deleteById);

module.exports = router;
