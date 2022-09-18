const Router = require('express');

const sneakersController = require('../controllers/sneakers.controller');
const checkRole = require('../middlewares/checkRole');

const router = new Router();

router.get('/', sneakersController.getAll);
router.get('/:id', sneakersController.getById);
router.post('/', checkRole('ADMIN'), sneakersController.create);
router.delete('/:id', checkRole('ADMIN'), sneakersController.deleteById);
router.put('/:id', sneakersController.updateById);

module.exports = router;
