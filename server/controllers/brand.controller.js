const {brandService} = require("../services/brand.service");

const brandController = {
    create: async (req, res, next) => {
        try {
            const {name} = req.body;

            const brand = await brandService.create(name);

            return res.json(brand);
        } catch (e) {
            next(e);
        }
    },

    getAll: async (req, res, next) => {
        try {
            const brands = await brandService.getAll();

            return res.json(brands);
        } catch (e) {
            next(e);
        }
    }
};

module.exports = {brandController};