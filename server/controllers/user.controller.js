const {Basket} = require("../models/basket.model");
const ApiError = require('../error/apiError');
const {userService} = require("../services/user.service");
const {tokenService} = require("../services/token.service");
const {authService} = require("../services/auth.service");
const {CLIENT_URL} = require("../configs/config");

module.exports = {
    registration: async (req, res, next) => {
        try {
            const {email, password, role} = req.body;

            const user = await userService.registration(email, role, password);

            await Basket.create({userId: user.id});
            const tokens = tokenService.generateJwt({id: user.id, email: user.email, role: user.role});

            res.cookie('refresh_token', tokens.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            await authService.saveTokens({...tokens, userId: user.id});

            return res.json({...tokens, user});
        } catch (e) {
            next(e);
        }
    },

    login: async (req, res, next) => {
        try {
            const {password} = req.body;
            const user = req.user;

            await tokenService.comparePassword(password, user.password);
            const tokens = tokenService.generateJwt({id: user.id, email: user.email, role: user.role});

            res.cookie('refresh_token', tokens.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            await authService.saveTokens({...tokens, userId: user.id});

            return res.json({...tokens, user});
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const {refresh_token} = req.cookies;

            const token = await tokenService.removeToken(refresh_token);
            res.clearCookie('refresh_token');

            return res.json(token);
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const {refresh_token} = req.cookies;

            const user = await userService.refresh(refresh_token);

            res.cookie('refresh_token', user.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

            return res.json(user);
        } catch (e) {
            next(e);
        }
    },

    activation: async (req, res, next) => {
        try {
            const activationLink = req.params.link;

            await userService.activate(activationLink);

            return res.redirect(CLIENT_URL);
        } catch (e) {
            next(e);
        }
    },

    getAll: async (req, res, next) => {
        try {
            const {id} = req.params;

            const users = await userService.findAll(id);

            return res.json(users);
        } catch (e) {
            next(e);
        }
    },

    updateById: async (req, res, next) => {
        try {
            let {id} = req.params;

            const user = await userService.updateById(req.body, id);

            return res.json(user);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}