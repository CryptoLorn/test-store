const Router = require('express');

const brandController = require('../controllers/brand.controller');
const {checkRole} = require("../middlewares/checkRole.middleware");
const {ADMIN} = require('../configs/config');

const router = new Router();

router.get('/', brandController.getAll);
router.post('/',  checkRole(ADMIN), brandController.create);

module.exports = router;
