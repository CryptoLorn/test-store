const jwt = require('jsonwebtoken');

const {ACCESS_KEY} = require('../configs/config');

const checkRoleMiddleware = {
    checkRole: (role) => async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];

            if (!token) {
                return res.status(401).json({message: "Unauthorized"});
            }

            const decoded = jwt.verify(token, ACCESS_KEY);

            if (decoded.role !== role) {
                return res.status(403).json({message: "No access rights"});
            }

            req.user = decoded;
            next();
        } catch (e) {
            return res.status(401).json({message: "Unauthorized"});
        }
    }
}

module.exports = {checkRoleMiddleware};