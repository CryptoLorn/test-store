const {authService} = require("../services/auth.service");
const {tokenService} = require("../services/token.service");
const {REFRESH_TOKEN} = require("../constants/tokenType.enum");

const authController = {
    registration: async (req, res, next) => {
        try {
            const {email, password, role} = req.body;

            const user = await authService.registration(email, role, password);

            const tokens = tokenService.generateJwt({id: user.id, email: user.email, role: user.role});

            res.cookie(REFRESH_TOKEN, tokens.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
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

            res.cookie(REFRESH_TOKEN, tokens.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
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
            res.clearCookie(REFRESH_TOKEN);

            return res.json(token);
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const {refresh_token} = req.cookies;

            const user = await authService.refresh(refresh_token);

            res.cookie(REFRESH_TOKEN, user.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

            return res.json(user);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = {authController};