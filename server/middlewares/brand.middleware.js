const ApiError = require("../error/apiError");
const {brandService} = require("../services/brand.service");

const brandMiddleware = {
    checkIsBrandUnique: async (req, res, next) => {
        try {
            const {name} = req.body;

            if (name.length < 2 || name.length > 30) {
                return next(ApiError.badRequest('name length must be from 2-30 characters'));
            }

            const brand = await brandService.findOneByName(name);

            if (brand) {
                return next(ApiError.badRequest('this brand is already present'));
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};

module.exports = {brandMiddleware};