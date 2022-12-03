const {ActionToken} = require("../models/actionToken.model");

const actionTokenService = {
    createActionToken: (dataToInsert) => {
        return ActionToken.create(dataToInsert);
    },

    getOneByParams: (token, tokenType) => {
        return ActionToken.findOne({where: {token, token_type: tokenType}});
    },

    deleteOne: (deleteParams) => {
        return ActionToken.destroy({where: {token: deleteParams}});
    }
}

module.exports = {actionTokenService};