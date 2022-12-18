const {Analytics} = require("../models/analytics.model");

const analyticsService = {
    create: (sneakerId) => {
        return Analytics.create({sneakerId});
    },

    getAll: () => {
        return Analytics.findAll();
    },

    updateById: (analytics, id) => {
        return Analytics.update(analytics, {where: {id}});
    },

    deleteById: (id) => {
        return Analytics.destroy({where: {sneakerId: id}});
    }
}

module.exports = {analyticsService};