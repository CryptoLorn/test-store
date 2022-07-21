const Router = require('express');

const sneakerController = require('../controllers/sneakerController');

const router = new Router();

router.get('/', sneakerController.getAll);
router.get('/:id', sneakerController.getById);
router.post('/', sneakerController.create);
router.delete('/:id', sneakerController.deleteById);

module.exports = router;
