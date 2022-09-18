const {Orders} = require("../models/Orders/orders.model");
const ApiError = require('../error/ApiError');

class OrdersController {
    async create(req, res, next) {
        try {
            let {basketId, sneakerId, brand_name, model, price, img, size} = req.body;
            const orders = await Orders.create({basketId, sneakerId, brand_name, model, price, img, size});

            return res.json(orders);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    };

    async getAll(req, res, next) {
        try {
            let {basketId} = req.query;
            let orders;

            if (basketId) {
                orders = await Orders.findAll({where: {basketId}});
            }

            return res.json(orders);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    };

    async deleteById(req, res, next) {
        try {
            let {id} = req.params;
            const orders = await Orders.destroy({where: {id}});

            return res.json(orders);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new OrdersController();