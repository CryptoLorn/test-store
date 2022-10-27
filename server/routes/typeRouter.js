const Router = require('express');

const typeController = require('../controllers/type.controller');
const {checkRole} = require("../middlewares/checkRole");
const {Role} = require("../enum/enum");

const router = new Router();

router.get('/', typeController.getAll);
router.post('/', checkRole(Role.ADMIN), typeController.create);

module.exports = router;