const ApiError = require("../error/apiError");
const {analyticsService} = require("../services/analytics.service");

const analyticsController = {
    getAll: async (req, res, next) => {
        try {
            const analytics = await analyticsService.getAll();

            return res.json(analytics);
        } catch (e) {
            next(e);
        }
    },

    updateById: async (req, res, next) => {
        try {
            let {id} = req.params;
            const {views, bought} = req.body;

            const analytics = await analyticsService.updateById({views, bought}, id);

            return res.json(analytics);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
};

module.exports = {analyticsController};