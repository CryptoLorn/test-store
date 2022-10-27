const {User} = require("../models/User/user.model");

module.exports = {
    checkIsEmailUniq: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userByEmail = await User.findOne({where: {email}});

            if (userByEmail) {
                return res.status(400).json({message: "Email is already busy"});
            }

            next();
        } catch (e) {
            return res.status(400).json({message: "Email is already busy"});
        }
    }
}