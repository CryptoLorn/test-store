const uuid = require("uuid");

const ApiError = require("../error/apiError");
const {User} = require("../models/user.model");
const {Auth} = require("../models/auth.model");
const {Basket} = require("../models/basket.model");
const {basketService} = require("./basket.service");
const {tokenService} = require("./token.service");
const {sendEmail} = require("./email.service");
const {ADMIN} = require("../constants/role.enum");
const {ACTIVATION_LINK} = require("../constants/emailAction.enum");

const authService = {
    registration: async (email, role, password) => {
        const hashPassword = await tokenService.hashPassword(password);
        const activationLink = uuid.v4();

        const isAdmin = await User.findOne({where: {role: ADMIN}});

        if (isAdmin && role === ADMIN) {
            throw ApiError.internal('Failed to register');
        }

        let user;
        if (isAdmin) {
            user = await User.create({email, role, password: hashPassword, activation_link: activationLink});
        } else {
            user = await User.create({email, role: ADMIN, password: hashPassword, activation_link: activationLink});
        }

        await basketService.create(user.id);
        await sendEmail(email, ACTIVATION_LINK, {activation_link: activationLink});

        return await User.findOne({where: {email}, include: Basket});
    },

    refresh: async (refreshToken) => {
        if (!refreshToken) {
            throw ApiError.badRequest('Unauthorized');
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw ApiError.badRequest('Unauthorized');
        }

        const user = await User.findOne({where: {id: userData.id}, include: Basket});

        const tokens = tokenService.generateJwt({id: user.id, email: user.email, role: user.role});
        await authService.saveTokens({...tokens, userId: user.id});

        return {...tokens, user};
    },

    saveTokens: async (tokens) => {
        const tokensData = await Auth.findOne({where: {userId: tokens.userId}});

        if (tokensData) {
            tokensData.access_token = tokens.access_token;
            tokensData.refresh_token = tokens.refresh_token;
            return tokensData.save();
        }

        return Auth.create(tokens);
    }
}

module.exports = {authService};