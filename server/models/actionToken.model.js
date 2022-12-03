const {DataTypes} = require("sequelize");

const sequelize = require("../db");

const ActionToken = sequelize.define('action_token', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    token: {type: DataTypes.STRING, allowNull: false},
    token_type: {type: DataTypes.STRING}
})

module.exports = {ActionToken};