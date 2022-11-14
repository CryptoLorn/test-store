const Router = require('express');

const typeController = require('../controllers/type.controller');
const {checkRole} = require("../middlewares/checkRole.middleware");
const {ADMIN} = require('../configs/config');

const router = new Router();

router.get('/', typeController.getAll);
router.post('/', checkRole(ADMIN), typeController.create);

module.exports = router;