const Router = require('express');

const analyticsController = require("../controllers/analytics.controller");
const {checkIsAuth} = require("../middlewares/auth.middleware");
const {checkRole} = require("../middlewares/checkRole.middleware");
const {ADMIN} = require("../constants/role.enum");

const router = new Router();

router.get('/', analyticsController.getAll); //checkIsAuth, checkRole(ADMIN),
router.get('/:id', analyticsController.getById);
router.put('/:id', analyticsController.updateById);

module.exports = router;