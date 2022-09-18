const {Sneakers} = require("../models/Sneakers/sneakers.model");

class SearchController {
    async getAllFromSearch(req, res) {
        const sneakers = await Sneakers.findAll();

        return res.json(sneakers);
    };
}

module.exports = new SearchController();