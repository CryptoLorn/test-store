const Router = require('express');

const userRouter = require('./userRouter');
const sneakerRouter = require('./sneakerRouter');
const brandRouter = require('./brandRouter');
const typeRouter = require('./typeRouter');
const basketRouter = require('./basketRouter');
const sizeRouter = require('./sizeRouter');

const router = new Router();

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/sneaker', sneakerRouter);
router.use('/basket', basketRouter);
router.use('/sizes', sizeRouter);

module.exports = router;
