const {DataTypes} = require("sequelize");

const sequelize = require("../db");
const {USER} = require("../constants/role.enum");
const {ACTIVE} = require("../constants/status.enum");

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, trim: true, lowercase: true, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: USER},
    status: {type: DataTypes.STRING, defaultValue: ACTIVE},
    is_activated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activation_link: {type: DataTypes.STRING}
});

module.exports = {User};