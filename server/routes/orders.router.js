const Router = require('express');

const {ordersController} = require('../controllers/orders.controller');
const {authMiddleware} = require("../middlewares/auth.middleware");

const router = new Router();

router.get('/', ordersController.getAll);
router.post('/', authMiddleware.checkIsAuth, ordersController.create);
router.delete('/:id', authMiddleware.checkIsAuth, ordersController.deleteById);

module.exports = router;
