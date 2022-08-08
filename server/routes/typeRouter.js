const Router = require('express');

const typeController = require('../controllers/typeController')
const checkRole = require('../logination/checkRole')

const router = new Router();

router.get('/', typeController.getAll);
router.post('/', checkRole('ADMIN'), typeController.create);
router.delete('/',);

module.exports = router;