const uuid = require('uuid');
const path = require('path');

const ApiError = require('../error/apiError');
const {sneakersService} = require("../services/sneakers.service");
const {analyticsService} = require("../services/analytics.service");

const sneakersController = {
    create: async (req, res, next) => {
        try {
            let {model, brand_name, price, color, material, description, brandId, typeId} = req.body;
            const {img} = req.files;

            let fileName = uuid.v4() + '.jpg';
            img.mv(path.resolve(__dirname, '..', 'poster', fileName));

            const sneakers = await sneakersService.create({
                model,
                brand_name,
                price,
                color,
                material,
                description,
                brandId,
                typeId,
                img: fileName
            })

            await analyticsService.create(sneakers.id);

            return res.json(sneakers);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    },

    getAll: async (req, res, next) => {
        try {
            let {brandId, typeId, limit, page} = req.query;

            const sneakers = await sneakersService.getAll(brandId, typeId, limit, page);

            return res.json(sneakers);
        } catch (e) {
            next(e);
        }
    },

    getById: async (req, res, next) => {
        try {
            let {id} = req.params;

            const sneakers = await sneakersService.getById(id);

            return res.json(sneakers);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    },

    updateById: async (req, res, next) => {
        try {
            let {id} = req.params;
            const {price} = req.body;

            const sneakers = await sneakersService.updateById(price, id);

            return res.json(sneakers);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    },

    deleteById: async (req, res, next) => {
        try {
            let {id} = req.params;

            const sneakers = await sneakersService.deleteById(id);

            return res.json(sneakers);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    },

    getAllBySearching: async (req, res, next) => {
        try {
            const sneakers = await sneakersService.getAllBySearching();

            return res.json(sneakers);
        } catch (e) {
            next(e);
        }
    }
};

module.exports = {sneakersController};