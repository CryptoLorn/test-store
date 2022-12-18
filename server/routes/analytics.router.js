const Router = require('express');

const {analyticsController} = require("../controllers/analytics.controller");

const router = new Router();

router.get('/', analyticsController.getAll);
router.put('/:id', analyticsController.updateById);

module.exports = router;