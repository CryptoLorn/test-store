const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiError = require("../error/apiError");
const {ACCESS_KEY, REFRESH_KEY} = require('../configs/config');
const {Auth} = require("../models/auth.model");

const tokenService = {
    hashPassword: async (password) => await bcrypt.hash(password, 10),
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
    },

    checkToken: (token, tokenType) => {
        try {
            let word;

            if (tokenType === 'access') word = ACCESS_KEY;
            if(tokenType === 'refresh') word = REFRESH_KEY;

            return jwt.verify(token, word);
        } catch (e) {
            throw ApiError('Token not valid');
        }
    },
    
    removeToken: async (refreshToken) => {
        const tokenData = await Auth.destroy({where: {refresh_token: refreshToken}});

        return tokenData;
    },

    validateAccessToken: (token) => {
        try {
            const userData = jwt.verify(token, ACCESS_KEY);

            return userData;
        } catch (e) {
            return null;
        }
    },

    validateRefreshToken: (token) => {
        try {
            const userData = jwt.verify(token, REFRESH_KEY);

            return userData;
        } catch (e) {
            return null;
        }
    },

    findToken: async (refreshToken) => {
        const tokenData = await Auth.findOne({where: {refresh_token: refreshToken}});

        return tokenData;
    }
}

module.exports = {tokenService};