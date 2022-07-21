const Router = require('express');

const brandController = require('../controllers/brandController');

const router = new Router();

router.get('/', brandController.getAll);
router.post('/', brandController.create);
router.delete('/',);

module.exports = router;
