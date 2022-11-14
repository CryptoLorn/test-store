const {DataTypes} = require("sequelize");

const sequelize = require("../db");
const {USER} = require('../configs/config');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, trim: true, lowercase: true, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: USER},
    is_activated: {type: DataTypes.STRING, defaultValue: false},
    activation_link: {type: DataTypes.STRING}
});

module.exports = {User};