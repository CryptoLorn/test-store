const Router = require('express');

const {sneakersController} = require("../controllers/sneakers.controller");
const {checkRoleMiddleware} = require("../middlewares/checkRole.middleware");
const {sneakersMiddleware} = require("../middlewares/sneakers.middleware");
const {ADMIN} = require("../constants/role.enum");

const router = new Router();

router.get('/', sneakersController.getAll);
router.get('/:id', sneakersController.getById);
router.post('/',
    checkRoleMiddleware.checkRole(ADMIN),
    sneakersMiddleware.checkIsBodyValid,
    sneakersController.create
);
router.put('/:id',
    checkRoleMiddleware.checkRole(ADMIN),
    sneakersController.updateById
);
router.delete('/:id',
    checkRoleMiddleware.checkRole(ADMIN),
    sneakersController.deleteById
);

module.exports = router;
