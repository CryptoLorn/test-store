const path = require('path');
const fs = require('fs');

const ApiError = require("../error/apiError");
const {Sneakers} = require("../models/sneakers.model");
const {analyticsService} = require("./analytics.service");
const {ordersService} = require("./orders.service");

const sneakersService = {
    create: (sneakers) => {
        return Sneakers.create(sneakers);
    },

    getAll: (brandId, typeId, limit, page) => {
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit;

        if (!brandId && !typeId) {
            return Sneakers.findAndCountAll({limit, offset});
        }

        if (brandId && !typeId) {
            return Sneakers.findAndCountAll({where: {brandId}, limit, offset});
        }

        if (!brandId && typeId) {
            return Sneakers.findAndCountAll({where: {typeId}, limit, offset});
        }

        if (brandId && typeId) {
            return Sneakers.findAndCountAll({where: {typeId, brandId}, limit, offset});
        }
    },

    getById: (id) => {
        return Sneakers.findByPk(id);
    },

    updateById: (price, id) => {
        if (price < 0 || price > 100000) {
            return ApiError.badRequest('price can be from 0 to 100000');
        }

        return Sneakers.update({price}, {where: {id}});
    },

    deleteById: async (id) => {
        const sneakers = await Sneakers.findByPk(id);

        if (!sneakers) {
            return ApiError.badRequest(`not found sneakers with id ${id}`);
        }

        await analyticsService.deleteById(id);
        await ordersService.deleteAllBySneakersId(id);

        const fullPath = path.resolve(__dirname);
        const parsePath = path.parse(fullPath);
        const dirPath = parsePath.dir;

        await fs.unlink(`${dirPath}/poster/${sneakers.img}`, (err) => {
            if (err) {
                return ApiError.internal('path not found');
            }
        })

        return Sneakers.destroy({where: {id}});
    },

    getAllBySearching: () => {
        return Sneakers.findAll();
    }
};

module.exports = {sneakersService};