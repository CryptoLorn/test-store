const jwt = require('jsonwebtoken');

const {ACCESS_KEY} = require('../configs/config');

module.exports = {
    checkIsAuth: async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];

            if (!token) {
                return res.status(401).json({message: "Unauthorized"});
            }

            const decoded = jwt.verify(token, ACCESS_KEY);
            req.user = decoded;

            next();
        } catch (e) {
            res.status(401).json({message: "Unauthorized"});
        }
    }
}