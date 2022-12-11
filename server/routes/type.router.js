const Router = require('express');

const {typeController} = require('../controllers/type.controller');
const {checkRoleMiddleware} = require("../middlewares/checkRole.middleware");
const {typeMiddleware} = require("../middlewares/type.middleware");
const {ADMIN} = require("../constants/role.enum");

const router = new Router();

router.get('/', typeController.getAll);
router.post('/',
    checkRoleMiddleware.checkRole(ADMIN),
    typeMiddleware.checkIsTypeUnique,
    typeController.create
);

module.exports = router;