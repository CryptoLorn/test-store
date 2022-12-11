const {Analytics} = require("../models/analytics.model");

const analyticsService = {
    create: (sneakerId) => {
        return Analytics.create({sneakerId});
    },

    getAll: () => {
        return Analytics.findAll();
    },

    findOne: (id) => {
        return Analytics.findByPk(id);
    },

    updateById: (analytics, id) => {
        return Analytics.update(analytics, {where: {id}});
    }
}

module.exports = {analyticsService};