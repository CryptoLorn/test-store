const Router = require('express');

const {userMiddleware} = require("../middlewares/user.middleware");
const {authController} = require("../controllers/auth.controller");

const router = new Router();

router.post('/registration',
    userMiddleware.checkIsDataValid,
    userMiddleware.checkIsEmailUnique,
    authController.registration
);
router.post('/login',
    userMiddleware.checkIsDataValid,
    userMiddleware.isUserPresent,
    authController.login
);
router.get('/refresh', authController.refresh);
router.post('/logout', authController.logout);

module.exports = router;