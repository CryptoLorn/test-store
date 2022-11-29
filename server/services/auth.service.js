const {Auth} = require("../models/auth.model");

const authService = {
    saveTokens: async (tokens) => {
        const tokensData = await Auth.findOne({where: {userId: tokens.userId}});

        if (tokensData) {
            tokensData.access_token = tokens.access_token;
            tokensData.refresh_token = tokens.refresh_token;
            return tokensData.save();
        }

        return Auth.create(tokens);
    }
}

module.exports = {authService};