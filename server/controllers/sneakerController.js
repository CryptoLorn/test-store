const uuid = require('uuid');
const path = require('path');

const ApiError = require('../error/ApiError');
const {Sneaker, SneakerInfo} = require('../models/models');

class SneakerController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + '.jpg';
            img.mv(path.resolve(__dirname, '..', 'poster', fileName));

            if (info) {
                info = JSON.parse(info);
                info.forEach(i =>
                    SneakerInfo.create({
                        title: i.title,
                        description: i.description,
                        sneakerId: sneaker.id
                    })
                )
            }

            const sneaker = await Sneaker.create({name, price, brandId, typeId, img: fileName});
            return res.json(sneaker);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 6
        let offset = page * limit - limit;
        let sneakers;

        if (!brandId && !typeId) {
            sneakers = await Sneaker.findAndCountAll({limit, offset});
        }

        if (brandId && !typeId) {
            sneakers = await Sneaker.findAndCountAll({where: {brandId}, limit, offset});
        }

        if (!brandId && typeId) {
            sneakers = await Sneaker.findAndCountAll({where: {typeId}, limit, offset});
        }

        if (brandId && typeId) {
            sneakers = await Sneaker.findAndCountAll({where: {typeId, brandId}, limit, offset});
        }
        return res.json(sneakers);
    };

    async getById(req, res) {
        let {id} = req.params;
        const sneaker = await Sneaker.findOne(
            {where: {id}, include: [{model: SneakerInfo, as: 'info'}]}
        )
        return res.json(sneaker);
    };

    async deleteById(req, res) {
        let {id} = req.params;
        const sneaker = await Sneaker.destroy({where: {id}})
        return res.json(sneaker);
    }
}

module.exports = new SneakerController();