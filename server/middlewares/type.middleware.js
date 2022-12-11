const {typeService} = require("../services/type.service");
const ApiError = require("../error/apiError");

const typeMiddleware = {
    checkIsTypeUnique: async (req, res, next) => {
        try {
            const {name} = req.body;

            if (name.length < 2 || name.length > 30) {
                return next(ApiError.badRequest('name length must be from 2-30 characters'));
            }

            const type = await typeService.findOneByName(name);

            if (type) {
                return next(ApiError.badRequest('this type is already present'));
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};

module.exports = {typeMiddleware};