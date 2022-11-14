const ApiError = require('../error/apiError');
const {Brand} = require("../models/brand.model");

class BrandController {
    async create(req, res, next) {
        const {name} = req.body;

        if (name.length < 2 || name.length > 30) {
            return next(ApiError.badRequest('name length must be from 2-30 characters'));
        }

        const brand = await Brand.create({name});
        return res.json(brand);
    };

    async getAll(req, res) {
        const brands = await Brand.findAll();
        return res.json(brands);
    };
}

module.exports = new BrandController();