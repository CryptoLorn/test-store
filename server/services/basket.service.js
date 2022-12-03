const {Basket} = require("../models/basket.model");

const basketService = {
    createBasket: async (id) => {
        return await Basket.create({userId: id});
    }
}

module.exports = {basketService};