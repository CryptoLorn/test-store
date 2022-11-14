const {Sneakers} = require("../models/sneakers.model");

class SearchController {
    async getAllFromSearch(req, res) {
        const sneakers = await Sneakers.findAll();

        return res.json(sneakers);
    };
}

module.exports = new SearchController();