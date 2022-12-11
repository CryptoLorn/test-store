const {basketService} = require("../services/basket.service");

const basketController = {
    getById: async (req, res, next) => {
        try {
            let {id} = req.params;

            const basket = await basketService.getById(id);

            return res.json(basket);
        } catch (e) {
            next(e);
        }
    }
};

module.exports = {basketController};