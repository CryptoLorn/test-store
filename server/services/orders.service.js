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
    }
};

module.exports = {ordersService};