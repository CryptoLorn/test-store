const {Auth} = require("../models/auth.model");

const authService = {
    saveTokens: (tokens) => {
        return Auth.create(tokens);
    }
}

module.exports = {authService};