const Router = require('express');

const userRouter = require('./userRouter');
const sneakerRouter = require('./sneakerRouter');
const brandRouter = require('./brandRouter');
const typeRouter = require('./typeRouter')

const router = new Router();

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/sneaker', sneakerRouter);

module.exports = router;
