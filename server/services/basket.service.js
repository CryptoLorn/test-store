const {Basket} = require("../models/basket.model");

const basketService = {
    create: (userId) => {
        return Basket.create({userId});
    },

    getById: (id) => {
        return Basket.findOne({where: {id}});
    }
};

module.exports = {basketService};