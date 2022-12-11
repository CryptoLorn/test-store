const {Type} = require("../models/type.model");

const typeService = {
    create: (name) => {
        return Type.create({name});
    },

    getAll: () => {
        return Type.findAll();
    },

    findOneByName: (name) => {
        return Type.findOne({where: {name}});
    }
}

module.exports = {typeService};