const Router = require('express');
const {body} = require('express-validator');

const router = new Router();

const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/registration', body('email').isEmail(), userController.registration);
router.post('/login', body('email').isEmail(), userController.login);
router.get('/auth', authMiddleware, userController.auth);
router.get('', userController.getAll);
router.put('/:id', userController.updateById);

module.exports = router;