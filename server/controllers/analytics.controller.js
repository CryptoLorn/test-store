const {Analytics} = require("../models/analytics.model");
const ApiError = require("../error/apiError");

class AnalyticsController {
    async getAll(req, res) {
        const analytics = await Analytics.findAll();

        return res.json(analytics);
    };

    async getById(req, res, next) {
        try {
            const {id} = req.params;

            const analytics = await Analytics.findByPk(id);

            return res.json(analytics);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async updateById(req, res, next) {
        try {
            let {id} = req.params;
            const {views, bought} = req.body;

            const analytics = await Analytics.update({views, bought}, {where: {id}});

            return res.json(analytics);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new AnalyticsController();