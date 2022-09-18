const {DataTypes} = require("sequelize");

const sequelize = require("../../db");

const Size = sequelize.define('size', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.DOUBLE, unique: true, allowNull: false}
});

module.exports = {Size};