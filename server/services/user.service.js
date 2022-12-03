const {Op} = require("sequelize");
const uuid = require('uuid');

const {User} = require("../models/user.model");
const {ADMIN} = require('../constants/role.enum');
const {tokenService} = require("./token.service");
const ApiError = require("../error/apiError");
const {sendEmail} = require("./email.service");
const {authService} = require("./auth.service");
const {ACTIVATION_LINK} = require("../constants/emailAction.enum");

const userService = {
    registration: async (email, role, password) => {
        const hashPassword = await tokenService.hashPassword(password);
        const activationLink = uuid.v4();

        const isAdmin = await User.findOne({where: {role: ADMIN}});

        if (isAdmin && role === ADMIN) {
            throw ApiError.internal('Failed to register');
        }

        await sendEmail(email, ACTIVATION_LINK, {activation_link: activationLink});

        if (isAdmin) {
            return User.create({email, role, password: hashPassword, activation_link: activationLink});
        } else {
            return User.create({email, role: ADMIN, password: hashPassword, activation_link: activationLink});
        }
    },

    activate: async (activationLink) => {
        const user = await User.findOne({where: {activation_link: activationLink}});

        if (!user) {
            throw ApiError.internal('Invalid link');
        }

        user.is_activated = true;
        await user.save();
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

        const user = await User.findOne({where: {id: userData.id}});
        const tokens = tokenService.generateJwt({id: user.id, email: user.email, role: user.role});
        await authService.saveTokens({...tokens, userId: user.id});

        return {...tokens, user};
    },

    findOneByRole: () => {
        return User.findOne({where: {role: ADMIN}});
    },

    findOneByEmail: (email) => {
        return User.findOne({where: {email}});
    },

    findAll: (id) => {
        return User.findAll({where: {id: {[Op.ne]: id}}})
    },

    updateById: (user, id) => {
        return User.update(user, {where: {id}});
    }
}

module.exports = {userService};