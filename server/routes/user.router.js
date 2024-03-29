const Router = require('express');

const router = new Router();

const {userController} = require("../controllers/user.controller");
const {authMiddleware} = require("../middlewares/auth.middleware");
const {userMiddleware} = require("../middlewares/user.middleware");
const {checkRoleMiddleware} = require("../middlewares/checkRole.middleware");
const {ADMIN} = require('../constants/role.enum');
const {FORGOT_PASSWORD_TOKEN} = require("../constants/tokenType.enum");

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
router.delete('/:id',
    checkRoleMiddleware.checkRole(ADMIN),
    userController.deleteById
);

module.exports = router;