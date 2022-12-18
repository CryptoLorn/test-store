const {Basket} = require("../models/basket.model");
const {ordersService} = require("./orders.service");

const basketService = {
    create: (userId) => {
        return Basket.create({userId});
    },

    getById: (id) => {
        return Basket.findOne({where: {id}});
    },

    deleteById: async (id) => {
        await ordersService.deleteAllByBasketId(id);

        return Basket.destroy({where: {userId: id}});
    }
};

module.exports = {basketService};