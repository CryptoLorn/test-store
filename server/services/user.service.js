const {Op} = require("sequelize");

const {User} = require("../models/user.model");
const {Basket} = require("../models/basket.model");
const ApiError = require("../error/apiError");
const {ADMIN} = require('../constants/role.enum');

const userService = {
    activate: async (activationLink) => {
        const user = await User.findOne({where: {activation_link: activationLink}});

        if (!user) {
            throw ApiError.internal('Invalid link');
        }

        user.is_activated = true;
        await user.save();
    },

    findOneByRole: () => {
        return User.findOne({where: {role: ADMIN}});
    },

    findOneByEmail: (email) => {
        return User.findOne({where: {email}, include: Basket});
    },

    findAll: (id) => {
        return User.findAll({where: {id: {[Op.ne]: id}}});
    },

    updateById: (user, id) => {
        return User.update(user, {where: {id}});
    }
}

module.exports = {userService};