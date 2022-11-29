const jwt = require('jsonwebtoken');

const {ACCESS_KEY} = require('../configs/config');
const {tokenService} = require("../services/token.service");

module.exports = {
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

            // const decoded = jwt.verify(token, ACCESS_KEY);
            req.user = userData;

            next();
        } catch (e) {
            res.status(401).json({message: "Unauthorized"});
        }
    }
}