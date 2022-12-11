const ApiError = require("../error/apiError");
const {MODEL_REGEX} = require("../constants/regex.enum");

const sneakersMiddleware = {
    checkIsBodyValid: async (req, res, next) => {
        try {
            let {model, price} = req.body;

            let reg = MODEL_REGEX.test(model);

            if (price < 0 || price > 100000) {
                return next(ApiError.badRequest('price can be from 0 to 100000'));
            } else if (reg === false) {
                return next(ApiError.badRequest('Please use only Latin letters and min 2-30 characters'));
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};

module.exports = {sneakersMiddleware};