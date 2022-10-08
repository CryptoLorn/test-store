const Router = require('express');

const sneakersController = require('../controllers/sneakers.controller');
const checkRole = require('../middlewares/checkRole');
const {Role} = require("../enum/enum");

const router = new Router();

router.get('/', sneakersController.getAll);
router.get('/:id', sneakersController.getById);
router.post('/', checkRole(Role.ADMIN), sneakersController.create);
router.delete('/:id', checkRole(Role.ADMIN), sneakersController.deleteById);
router.put('/:id', sneakersController.updateById);

module.exports = router;
