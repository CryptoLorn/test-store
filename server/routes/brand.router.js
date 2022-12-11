const Router = require('express');

const {brandController} = require('../controllers/brand.controller');
const {checkRoleMiddleware} = require("../middlewares/checkRole.middleware");
const {brandMiddleware} = require("../middlewares/brand.middleware");
const {ADMIN} = require("../constants/role.enum");

const router = new Router();

router.get('/', brandController.getAll);
router.post('/',
    checkRoleMiddleware.checkRole(ADMIN),
    brandMiddleware.checkIsBrandUnique,
    brandController.create
);

module.exports = router;
