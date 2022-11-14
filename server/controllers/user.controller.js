const {Basket} = require("../models/basket.model");
const ApiError = require('../error/apiError');
const {ADMIN} = require('../configs/config');
const {userService} = require("../services/user.service");
const {tokenService} = require("../services/token.service");
const {authService} = require("../services/auth.service");

module.exports = {
    registration: async (req, res, next) => {
        try {
            const {email, password, role} = req.body;

            const hashPassword = await tokenService.hashPassword(password);
            const isAdmin = await userService.findOneByRole();

            if (isAdmin && role === ADMIN) {
                return next(ApiError.internal('Failed to register'));
            }

            let user;
            if (isAdmin) {
                user = await userService.registration({email, role, password: hashPassword});
            } else {
                user = await userService.registration({email, role: ADMIN, password: hashPassword});
            }

            await Basket.create({userId: user.id});
            const tokens = tokenService.generateJwt({id: user.id, email: user.email, role: user.role});

            return res.json({tokens});
        } catch (e) {
            next(e);
        }
    },

    login: async (req, res, next) => {
        try {
            const {password} = req.body;
            const user = req.user;

            await tokenService.comparePassword(password, user.password);
            const tokens = tokenService.generateJwt({id: user.id, email: user.email, role: user.role});

            await authService.saveTokens({...tokens, userId: user.id})

            return res.json({...tokens, user: req.user});
        } catch (e) {
            next(e);
        }
    },

    auth: async (req, res, next) => {
        try {
            const user = req.user;

            const tokens = tokenService.generateJwt({id: user.id, email: user.email, role: user.role});

            return res.json({tokens});
        } catch (e) {
            next(e);
        }
    },

    getAll: async (req, res, next) => {
        try {
            const {id} = req.params;

            const users = await userService.findAll(id);

            return res.json(users);
        } catch (e) {
            next(e);
        }
    },

    updateById: async (req, res, next) => {
        try {
            let {id} = req.params;

            const user = await userService.updateById(req.body, id);

            return res.json(user);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

// class UserController {
//     async registration(req, res, next) {
//         const errors = validationResult(req);
//
//         if(!errors.isEmpty()) {
//             return next(ApiError.badRequest('Invalid email', errors.array()));
//         }
//
//         const {email, password, role} = req.body;
//
//         if(!email || !password) {
//             return next(ApiError.badRequest('Invalid email or password'));
//         }
//
//         if (password.length < 3 || password.length > 15) {
//             return next(ApiError.badRequest('"password" length must be from 3-15 characters'));
//         }
//
//         const hashPassword = await bcrypt.hash(password, 5);
//         const isAdmin = await User.findOne({where: {role: Role.ADMIN}});
//         let user;
//
//         if (isAdmin && role === Role.ADMIN) {
//             return next(ApiError.internal('Failed to register'));
//         }
//
//         if (isAdmin) {
//             user = await User.create({email, role, password: hashPassword});
//         } else {
//             user = await User.create({email, role: Role.ADMIN, password: hashPassword});
//         }
//
//         const basket = await Basket.create({userId: user.id});
//         const token = generateJwt(user.id, user.email, user.role);
//         return res.json({token});
//     };
//
//     async login(req, res, next) {
//         const errors = validationResult(req);
//
//         if(!errors.isEmpty()) {
//             return next(ApiError.badRequest('Invalid email or password', errors.array()));
//         }
//
//         const {email, password} = req.body;
//         const user = await User.findOne({where: {email}});
//
//         if (!user) {
//             return next(ApiError.internal('No found user with this name'));
//         }
//
//         let comparePassword = bcrypt.compareSync(password, user.password);
//
//         if (!comparePassword) {
//             return next(ApiError.internal('Invalid email or password'));
//         }
//
//         const token = generateJwt(user.id, user.email, user.role);
//
//         return res.json({token});
//     };
//
//     async auth(req, res) {
//         const token = generateJwt(req.user.id, req.user.email, req.user.role);
//         return res.json({token});
//     };
//
//     async getAll(req, res) {
//         const {id} = req.params;
//
//         const users = await User.findAll({where: {id: {[Op.ne]: id }}});
//
//         return res.json(users);
//     }
//
//     async updateById(req, res, next) {
//         try {
//             let {id} = req.params;
//             const {email, role} = req.body;
//
//             let isValid = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
//
//             if (!isValid) {
//                 return next(ApiError.internal('Invalid email'));
//             } else if (isEmpty(role)) {
//                 return next(ApiError.internal('Role cannot be empty'));
//             } else if (role !== Role.ADMIN && role !== Role.USER) {
//                 return next(ApiError.internal('Can\'t save'));
//             }
//
//             const user = await User.update({email, role}, {where: {id}});
//
//             return res.json(user);
//         } catch (e) {
//             next(ApiError.badRequest(e.message));
//         }
//     }
// }

// module.exports = new UserController();