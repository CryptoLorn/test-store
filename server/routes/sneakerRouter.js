const Router = require('express');

const sneakerController = require('../controllers/sneakerController');
const checkRole = require('../middlewares/checkRole');

const router = new Router();

router.get('/', sneakerController.getAll);
router.get('/:id', sneakerController.getById);
router.post('/', checkRole('ADMIN'), sneakerController.create);
router.delete('/:id', checkRole('ADMIN'), sneakerController.deleteById);

module.exports = router;
