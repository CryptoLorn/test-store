const uuid = require('uuid');
const path = require('path');

const {Sneakers} = require("../models/Sneakers/sneakers.model");
const ApiError = require('../error/ApiError');
const {Analytics} = require("../models/Analytics/analytics.model");

class SneakersController {
    async create(req, res, next) {
        try {
            let {model, brand_name, price, color, material, description, brandId, typeId} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + '.jpg';
            img.mv(path.resolve(__dirname, '..', 'poster', fileName));

            let reg = /^[a-zA-Z0-9-:!#$%^&*() ]+$/.test(model);

            if (typeId === null || brandId === null || brand_name === null) {
                return next(ApiError.badRequest('no type or brand specified'));
            } else if (model.length < 2 || model.length > 30) {
                return next(ApiError.badRequest('model length must be from 2-30 characters'));
            } else if (price < 0 || price > 100000) {
                return next(ApiError.badRequest('price can be from 0 to 100000'));
            } else if (reg === false) {
                return next(ApiError.badRequest('Please use only Latin letters'));
            }

            const sneakers = await Sneakers.create(
                {
                    model,
                    brand_name,
                    price,
                    color,
                    material,
                    description,
                    brandId,
                    typeId,
                    img: fileName
                });

            const analytics = await Analytics.create({sneakerId: sneakers.id});

            return res.json(sneakers);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query;
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit;
        let sneakers;

        if (!brandId && !typeId) {
            sneakers = await Sneakers.findAndCountAll({limit, offset});
        }

        if (brandId && !typeId) {
            sneakers = await Sneakers.findAndCountAll({where: {brandId}, limit, offset});
        }

        if (!brandId && typeId) {
            sneakers = await Sneakers.findAndCountAll({where: {typeId}, limit, offset});
        }

        if (brandId && typeId) {
            sneakers = await Sneakers.findAndCountAll({where: {typeId, brandId}, limit, offset});
        }

        return res.json(sneakers);
    };

    async getById(req, res, next) {
        try {
            let {id} = req.params;

            const sneakers = await Sneakers.findByPk(id);

            return res.json(sneakers);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    };

    async updateById(req, res, next) {
        try {
            let {id} = req.params;
            const {price} = req.body;

            const sneakers = await Sneakers.update({price}, {where: {id}});

            return res.json(sneakers);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    };

    async deleteById(req, res, next) {
        try {
            let {id} = req.params;

            const analytics = await Analytics.findByPk(id);
            await analytics.destroy({where: {id}});

            const sneakers = await Sneakers.destroy({where: {id}});

            return res.json(sneakers);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new SneakersController();