const Router = require('express');
const {body} = require('express-validator');

const router = new Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/registration', body('email').isEmail(), userController.registration);
router.post('/login', body('email').isEmail(), userController.login);
router.get('/auth', authMiddleware, userController.auth);

module.exports = router;