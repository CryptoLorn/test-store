const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const sneakerRouter = require('./sneakerRouter');
const brandRouter = require('./brandRouter');
const typeRouter = require('./typeRoute');

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/sneaker', sneakerRouter);

module.exports = router;
