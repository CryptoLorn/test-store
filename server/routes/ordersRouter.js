const Router = require('express');

const router = new Router();

const ordersController = require('../controllers/orders.controller');
const {checkIsAuth} = require("../middlewares/auth.middleware");

router.get('/', ordersController.getAll);
router.post('/', checkIsAuth, ordersController.create);
router.delete('/:id', checkIsAuth, ordersController.deleteById);

module.exports = router;
