const ApiError = require("../error/apiError");
const {tokenService} = require("../services/token.service");
const {actionTokenService} = require("../services/actionToken.service");
const {AUTHORIZATION} = require("../constants/constant");

const authMiddleware = {
    checkIsAuth: async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];

            if (!token) {
                return res.status(401).json({message: "Unauthorized"});
            }

            const userData = tokenService.validateAccessToken(token);

            if (!userData) {
                return res.status(401).json({message: "Unauthorized"});
            }

            req.user = userData;

            next();
        } catch (e) {
            res.status(401).json({message: "Unauthorized"});
        }
    },
    
    checkActionToken: (tokenType) => async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);
            const {password} = req.body;

            if (!token) {
                return next(ApiError.internal('No token'));
            }

            if (password.length < 3 || password.length > 15) {
                return next(ApiError.badRequest('password length must be from 3-15 characters'));
            }

            tokenService.checkToken(token);
            const tokenInfo = await actionTokenService.getOneByParams(token, tokenType);

            if (!tokenInfo) {
                return next(ApiError.internal('Not valid token'));
            }

            req.tokenInfo = tokenInfo;

            next();
        } catch (e) {
            next(e);
        }
    }
}

module.exports = {authMiddleware};