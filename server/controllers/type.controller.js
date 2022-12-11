const {typeService} = require("../services/type.service");

const typeController = {
    create: async (req, res, next) => {
        try {
            const {name} = req.body;

            const type = await typeService.create(name);

            return res.json(type);
        } catch (e) {
            next(e);
        }
    },

    getAll: async (req, res, next) => {
        try {
            const types = await typeService.getAll();

            return res.json(types);
        } catch (e) {
            next(e);
        }
    }
};

module.exports = {typeController};