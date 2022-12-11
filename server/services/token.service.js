const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiError = require("../error/apiError");
const {Auth} = require("../models/auth.model");
const {ACCESS_KEY, REFRESH_KEY, ACTION_TOKEN_SECRET} = require('../configs/config');
const {FORGOT_PASSWORD_TOKEN} = require("../constants/tokenType.enum");

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

    createActionToken: (tokenType, payload = {}) => {
        let expiresIn = '1d';

        if (tokenType === FORGOT_PASSWORD_TOKEN) {
            expiresIn = '7d';
        }

        return jwt.sign(payload, ACTION_TOKEN_SECRET, {expiresIn});
    },

    checkToken: (token) => {
        try {
            return jwt.verify(token, ACTION_TOKEN_SECRET);
        } catch (e) {
            throw ApiError.internal('Token not valid');
        }
    },
    
    removeToken: async (refreshToken) => {
        return await Auth.destroy({where: {refresh_token: refreshToken}});
    },

    deleteMany: (id) => {
        return Auth.destroy({where: {userId: id}});
    },

    validateAccessToken: (token) => {
        try {
            return jwt.verify(token, ACCESS_KEY);
        } catch (e) {
            throw ApiError.internal('Token not valid');
        }
    },

    validateRefreshToken: (token) => {
        try {
            return jwt.verify(token, REFRESH_KEY);
        } catch (e) {
            throw ApiError.internal('Token not valid');
        }
    },

    findToken: async (refreshToken) => {
        return await Auth.findOne({where: {refresh_token: refreshToken}});
    }
}

module.exports = {tokenService};