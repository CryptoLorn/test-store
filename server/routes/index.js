const Router = require('express');

const userRouter = require('./userRouter');
const sneakersRouter = require('./sneakersRouter');
const brandRouter = require('./brandRouter');
const typeRouter = require('./typeRouter');
const basketRouter = require('./basketRouter');
const ordersRouter = require('./ordersRouter');
const searchRouter = require('./searchRouter');

const router = new Router();

router.use('/user', userRouter);
router.use('/basket', basketRouter);
router.use('/types', typeRouter);
router.use('/brands', brandRouter);
router.use('/sneakers', sneakersRouter);
router.use('/orders', ordersRouter);
router.use('/search', searchRouter);

module.exports = router;
