const Router = require('express');

const {sneakersController} = require("../controllers/sneakers.controller");

const router = new Router();

router.get('/', sneakersController.getAllBySearching);

module.exports = router;