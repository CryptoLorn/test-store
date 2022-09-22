const {Basket} = require("../models/Basket/basket.model");

class BasketController {
    async getById(req, res) {
        let {id} = req.params;
        const basket = await Basket.findOne({where: {id}});

        return res.json(basket);
    };
}

module.exports = new BasketController();