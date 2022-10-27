const Router = require('express');
const {body} = require('express-validator');

const router = new Router();

const userController = require('../controllers/user.controller');
const {Role} = require("../enum/enum");
const {checkIsAuth} = require("../middlewares/auth.middleware");
const {checkRole} = require("../middlewares/checkRole");
const {checkIsEmailUniq} = require("../middlewares/checkIsEmailUniq");

router.post('/registration', body('email').isEmail(), checkIsEmailUniq, userController.registration);
router.post('/login', body('email').isEmail(), userController.login);
router.get('/auth', checkIsAuth, userController.auth);
router.get('/:id', checkRole(Role.ADMIN), userController.getAll);
router.put('/:id', checkRole(Role.ADMIN), userController.updateById);

module.exports = router;