const ApiError = require('../error/ApiError');

class UserController {
    async registration(req, res) {

    };

    async login(req, res) {

    };

    async auth(req, res, next) {
        const {id} = req.query;

        // Обробка помилки, якщо нема id
        // if (!id) {
        //     return next(ApiError.badRequest('Not ID'))
        // }
        res.json(id);
    };
}

module.exports = new UserController();