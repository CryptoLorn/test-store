const {Basket} = require("../models/dependencies");

class BasketController {
    async getById(req, res) {
        let {id} = req.params;
        const basket = await Basket.findOne({where: {id}});

        return res.json(basket);
    };
}

module.exports = new BasketController();