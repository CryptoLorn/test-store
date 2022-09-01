const {Orders} = require('../models/models');
const ApiError = require('../error/ApiError');
const {where} = require("sequelize");

class OrdersController {
    async create(req, res, next) {
        try {
            let {basketId, sneakerId, brandId, name, price, img} = req.body;
            const orders = await Orders.create({basketId, sneakerId, brandId, name, price, img});
            return res.json(orders);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    };

    async getAll(req, res) {
        let {basketId} = req.query
        let orders;

        if (basketId) {
            orders = await Orders.findAll({where: {basketId}});
        }


        // const orders = await Orders.findAll();
        return res.json(orders);
    };
}

module.exports = new OrdersController();