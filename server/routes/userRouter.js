const Router = require('express');
const {body} = require('express-validator');

const router = new Router();

const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/checkRole');
const {Role} = require("../enum/enum");

router.post('/registration', body('email').isEmail(), userController.registration);
router.post('/login', body('email').isEmail(), userController.login);
router.get('/auth', authMiddleware, userController.auth);
router.get('', checkRole(Role.ADMIN), userController.getAll);
router.put('/:id', checkRole(Role.ADMIN), userController.updateById);

module.exports = router;