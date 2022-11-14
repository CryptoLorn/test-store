const {DataTypes} = require("sequelize");

const sequelize = require("../db");

const Analytics = sequelize.define('analytics', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    views: {type: DataTypes.INTEGER, defaultValue: 0},
    bought: {type: DataTypes.INTEGER, defaultValue: 0}
})

module.exports = {Analytics};