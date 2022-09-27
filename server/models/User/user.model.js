const {DataTypes} = require("sequelize");

const sequelize = require("../../db");
const {Role} = require("../../enum/enum");

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, trim: true, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: Role.USER}
});

module.exports = {User};