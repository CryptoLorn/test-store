const ApiError = require('../error/apiError');
const {ordersService} = require("../services/orders.service");

const ordersController = {
    create: async (req, res, next) => {
        try {
            const {basketId, sneakerId, brand_name, model, price, img, size} = req.body;

            const orders = await ordersService.create({basketId, sneakerId, brand_name, model, price, img, size});

            return res.json(orders);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    },

    getAll: async (req, res, next) => {
        try {
            const {basketId} = req.query;

            const orders = await ordersService.getAll(basketId);

            return res.json(orders);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    },

    deleteById: async (req, res, next) => {
        try {
            const {id} = req.params;

            const orders = await ordersService.deleteById(id);

            return res.json(orders);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = {ordersController};