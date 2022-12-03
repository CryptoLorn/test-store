const {isEmpty} = require("validator");

const ApiError = require("../error/apiError");
const {userService} = require("../services/user.service");
const {REGEX} = require("../constants/reges.enum");
const {ADMIN, USER} = require("../constants/role.enum");

module.exports = {
    checkIsDataValid: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            if (!email || !password) {
                return next(ApiError.badRequest('Invalid email or password'));
            }

            let isValid = REGEX.test(email);
            if (!isValid) {
                return next(ApiError.internal('Invalid email or password'));
            }

            if (password.length < 3 || password.length > 15) {
                return next(ApiError.badRequest('password length must be from 3-15 characters'));
            }

            next();
        } catch (e) {
            return res.status(400).json({message: "Invalid email or password"});
        }
    },

    checkIsEmailUnique: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userByEmail = await userService.findOneByEmail(email);

            if (userByEmail) {
                return res.status(400).json({message: "User with this email is exist"});
            }

            next();
        } catch (e) {
            return res.status(400).json({message: "User with this email is exist"});
        }
    },

    checkIsBodyValid: async (req, res, next) => {
        try {
            const {email, role} = req.body;

            let isValid = REGEX.test(email);

            if (!isValid) {
                return next(ApiError.internal('Invalid email'));
            } else if (isEmpty(role)) {
                return next(ApiError.internal('Role cannot be empty'));
            } else if (role !== ADMIN && role !== USER) {
                return next(ApiError.internal('Can\'t save'));
            }

            next();
        } catch (e) {
            return res.status(400).json({message: 'Can\'t save'});
        }
    },

    isUserPresent: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await userService.findOneByEmail(email);

            if (!user) {
                return next(ApiError.internal('No found user with this name'));
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    }
}