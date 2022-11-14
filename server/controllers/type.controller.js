const {Type} = require("../models/type.model");
const ApiError = require("../error/apiError");

class TypeController {
    async create(req, res, next) {
        const {name} = req.body;

        if (name.length < 2 || name.length > 30) {
            return next(ApiError.badRequest('name length must be from 2-30 characters'));
        }

        const type = await Type.create({name});

        return res.json(type);
    };

    async getAll(req, res) {
        const types = await Type.findAll();

        return res.json(types);
    };
}

module.exports = new TypeController();