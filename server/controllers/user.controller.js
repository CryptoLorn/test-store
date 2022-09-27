const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

const {User} = require("../models/User/user.model");
const {Basket} = require("../models/Basket/basket.model");
const ApiError = require('../error/ApiError');
const {Role} = require("../enum/enum");

const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role}, process.env.SECRET_KEY, {expiresIn: '24h'});
}

class UserController {
    async registration(req, res, next) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return next(ApiError.badRequest('Invalid email', errors.array()));
        }

        const {email, password, role} = req.body;

        if(!email || !password) {
            return next(ApiError.badRequest('Invalid email or password'));
        }

        if (password.length < 3 || password.length > 15) {
            return next(ApiError.badRequest('"password" length must be from 3-15 characters'));
        }

        const candidate = await User.findOne({where: {email}});
        if (candidate) {
            return next(ApiError.badRequest('User with this email already exists'));
        }


        const hashPassword = await bcrypt.hash(password, 5);
        const isAdmin = await User.findOne({where: {role: Role.ADMIN}});
        let user;

        if (isAdmin && role === Role.ADMIN) {
            return next(ApiError.internal('Failed to register'));
        }

        if (isAdmin) {
            user = await User.create({email, role, password: hashPassword});
        } else {
            user = await User.create({email, role: Role.ADMIN, password: hashPassword});
        }

        const basket = await Basket.create({userId: user.id});
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({token});
    };

    async login(req, res, next) {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return next(ApiError.badRequest('Invalid email', errors.array()));
        }

        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});

        if (!user) {
            return next(ApiError.internal('No found user with this name'));
        }

        let comparePassword = bcrypt.compareSync(password, user.password);

        if (!comparePassword) {
            return next(ApiError.internal('Invalid email or password'));
        }

        const token = generateJwt(user.id, user.email, user.role);

        return res.json({token});
    };

    async auth(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role);
        return res.json({token});
    };

    async getAll(req, res) {
        const users = await User.findAll();
        return res.json(users);
    }

    async updateById(req, res, next) {
        try {
            let {id} = req.params;
            const {email, role} = req.body;

            const user = await User.update({email, role}, {where: {id}});

            return res.json(user);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new UserController();