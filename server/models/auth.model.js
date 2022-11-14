const {DataTypes} = require("sequelize");

const sequelize = require("../db");

const Auth = sequelize.define('auth', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    access_token: {type: DataTypes.STRING, allowNull: false},
    refresh_token: {type: DataTypes.STRING, allowNull: false}
})

module.exports = {Auth};