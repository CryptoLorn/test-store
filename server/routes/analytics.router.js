const Router = require('express');

const analyticsController = require("../controllers/analytics.controller");
const {checkIsAuth} = require("../middlewares/auth.middleware");
const {checkRole} = require("../middlewares/checkRole.middleware");
const {ADMIN} = require("../configs/config");

const router = new Router();

router.get('/', checkIsAuth, checkRole(ADMIN), analyticsController.getAll);
router.get('/:id', analyticsController.getById);
router.put('/:id', analyticsController.updateById);

module.exports = router;