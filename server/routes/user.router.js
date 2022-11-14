const Router = require('express');

const router = new Router();

const userController = require('../controllers/user.controller');
const {checkIsAuth} = require("../middlewares/auth.middleware");
const {checkRole} = require("../middlewares/checkRole.middleware");
const userMiddleware = require("../middlewares/user.middleware");
const {ADMIN} = require('../configs/config');

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
router.get('/auth',
    checkIsAuth,
    userController.auth
);
router.get('/:id',
    checkRole(ADMIN),
    userController.getAll
);
router.put('/:id',
    checkRole(ADMIN),
    userMiddleware.checkIsBodyValid,
    userController.updateById
);

module.exports = router;