const {Brand} = require("../models/brand.model");

const brandService = {
    create: (name) => {
        return Brand.create({name});
    },

    getAll: () => {
        return Brand.findAll();
    },

    findOneByName: (name) => {
        return Brand.findOne({where: {name}});
    }
};

module.exports = {brandService};