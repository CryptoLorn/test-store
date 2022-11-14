const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiError = require("../error/apiError");
const {ACCESS_KEY, REFRESH_KEY} = require('../configs/config');

const tokenService = {
    hashPassword: (password) => bcrypt.hash(password, 10),
    comparePassword: async (password, hashPassword) => {
        const isPasswordSame = await bcrypt.compare(password, hashPassword);

        if (!isPasswordSame) {
            throw ApiError.internal('Invalid email or password');
        }
    },
    generateJwt: (payload = {}) => {
        const access_token = jwt.sign(payload, ACCESS_KEY, {expiresIn: '24h'});
        const refresh_token = jwt.sign(payload, REFRESH_KEY, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        }
    }
}

module.exports = {tokenService};