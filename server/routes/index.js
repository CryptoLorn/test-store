const Router = require('express');

const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const sneakersRouter = require('./sneakers.router');
const brandRouter = require('./brand.router');
const typeRouter = require('./type.router');
const basketRouter = require('./basket.router');
const ordersRouter = require('./orders.router');
const searchRouter = require('./search.router');
const analyticsRouter = require('./analytics.router');

const router = new Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/basket', basketRouter);
router.use('/types', typeRouter);
router.use('/brands', brandRouter);
router.use('/sneakers', sneakersRouter);
router.use('/orders', ordersRouter);
router.use('/search', searchRouter);
router.use('/analytics', analyticsRouter);

module.exports = router;
