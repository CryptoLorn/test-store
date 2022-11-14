const {Op} = require("sequelize");

const {User} = require("../models/user.model");
const {ADMIN} = require('../configs/config');

const userService = {
    registration: (userObject) => {
        return User.create(userObject);
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