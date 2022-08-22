const Router = require('express');

const brandController = require('../controllers/brandController');
const checkRole = require('../middlewares/checkRole');

const router = new Router();

router.get('/', brandController.getAll);
router.post('/',  checkRole('ADMIN'), brandController.create);
router.delete('/',);

module.exports = router;
