const Router = require('express');

const userRouter = require('./userRouter');
const sneakerRouter = require('./sneakerRouter');
const brandRouter = require('./brandRouter');
const typeRouter = require('./typeRouter');
const sizeRouter = require('./sizeRouter');
const basketRouter = require('./basketRouter');
const ordersRouter = require('./ordersRouter');

const router = new Router();

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/sneaker', sneakerRouter);
router.use('/sizes', sizeRouter);
router.use('/basket', basketRouter);
router.use('/orders', ordersRouter);

module.exports = router;
