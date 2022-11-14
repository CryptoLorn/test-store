const Router = require('express');

const searchController = require('../controllers/search.controller');

const router = new Router();

router.get('/', searchController.getAllFromSearch);

module.exports = router;