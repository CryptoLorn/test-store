const Router = require('express');

const router = new Router();

const userController = require('../controllers/user.controller');
const userMiddleware = require("../middlewares/user.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const checkRoleMiddleware = require("../middlewares/checkRole.middleware");
const {ADMIN} = require('../constants/role.enum');
const {FORGOT_PASSWORD_TOKEN} = require("../constants/tokenType.enum");

router.post('/registration',
    userMiddleware.checkIsDataValid,
    userMiddleware.checkIsEmailUnique,
    userController.registration
);
router.post('/login',
    userMiddleware.checkIsDataValid,
    userMiddleware.isUserPresent,
    userController.login
);
router.get('/refresh', userController.refresh);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activation);
router.get('/:id',
    authMiddleware.checkIsAuth,
    checkRoleMiddleware.checkRole(ADMIN),
    userController.getAll
);
router.put('/:id',
    checkRoleMiddleware.checkRole(ADMIN),
    userMiddleware.checkIsBodyValid,
    userController.updateById
);
router.post('/password/forgot',
    userMiddleware.isUserPresent,
    userController.forgotPassword
);
router.put('/password/forgot',
    authMiddleware.checkActionToken(FORGOT_PASSWORD_TOKEN),
    userController.setNewPassword
);

module.exports = router;