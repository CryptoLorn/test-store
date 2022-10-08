const Router = require('express');

const analyticsController = require("../controllers/analytics.controller");

const router = new Router();

router.get('/', analyticsController.getAll);
router.get('/:id', analyticsController.getById);
router.put('/:id', analyticsController.updateById);

module.exports = router;