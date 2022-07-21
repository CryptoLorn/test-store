const Router = require('express');
const router = new Router();
const sneakerController = require('../controllers/sneakerController');

router.get('/', sneakerController.getAll);
router.get('/:id', sneakerController.getById);
router.post('/', sneakerController.create);
router.delete('/:id', sneakerController.deleteById);

module.exports = router;
