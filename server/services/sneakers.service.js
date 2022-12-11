const ApiError = require("../error/apiError");
const {Sneakers} = require("../models/sneakers.model");
const {analyticsService} = require("./analytics.service");

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
            return next(ApiError.badRequest('price can be from 0 to 100000'));
        }

        return Sneakers.update({price}, {where: {id}});
    },

    deleteById: async (id) => {
        const analytics = await analyticsService.findOne(id);
        await analytics.destroy({where: {id}});

        return Sneakers.destroy({where: {id}});
    },

    getAllBySearching: () => {
        return Sneakers.findAll();
    }
};

module.exports = {sneakersService};