const ApiError = require('../error/apiError');
const {userService} = require("../services/user.service");
const {tokenService} = require("../services/token.service");
const {actionTokenService} = require("../services/actionToken.service");
const {sendEmail} = require("../services/email.service");
const {CLIENT_URL} = require("../configs/config");
const {FORGOT_PASSWORD_TOKEN} = require("../constants/tokenType.enum");
const {FORGOT_PASS} = require("../constants/emailAction.enum");

const userController = {
    forgotPassword: async (req, res, next) => {
        try {
            const {email, id} = req.user;

            const actionToken = tokenService.createActionToken(FORGOT_PASSWORD_TOKEN, {id});

            const forgotPasswordURL = `${CLIENT_URL}/password/forgot/${actionToken}`;
            await sendEmail(email, FORGOT_PASS, {forgotPasswordURL});
            await actionTokenService.createActionToken({
                token: actionToken,
                token_type: FORGOT_PASSWORD_TOKEN,
                userId: id
            });

            res.json('OK');
        } catch (e) {
            next(e);
        }
    },

    setNewPassword: async (req, res, next) => {
        try {
            const {userId, token} = req.tokenInfo;
            const {password} = req.body;

            await tokenService.deleteMany(userId);
            await actionTokenService.deleteOne(token);

            const hashPassword = await tokenService.hashPassword(password);
            await userService.updateById({password: hashPassword}, userId);

            res.json('OK');
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

module.exports = {userController};