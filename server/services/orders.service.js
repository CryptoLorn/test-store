const {Orders} = require("../models/orders.model");

const ordersService = {
    create: (orders) => {
        return Orders.create(orders);
    },

    getAll: (basketId) => {
        if (basketId) {
            return Orders.findAll({where: {basketId}});
        }
    },

    deleteById: (id) => {
        return Orders.destroy({where: {id}});
    },

    deleteAllByBasketId: (id) => {
        return Orders.destroy({where: {basketId: id}, force: true});
    },

    deleteAllBySneakersId: (id) => {
        return Orders.destroy({where: {sneakerId: id}, force: true});
    }
};

module.exports = {ordersService};