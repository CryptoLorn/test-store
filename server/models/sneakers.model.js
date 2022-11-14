const {DataTypes} = require("sequelize");

const sequelize = require("../db");

const Sneakers = sequelize.define('sneakers', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    model: {type: DataTypes.STRING, unique: true, allowNull: false},
    brand_name: {type: DataTypes.STRING, allowNull: true},
    price: {type: DataTypes.INTEGER, allowNull: false},
    color: {type: DataTypes.STRING, allowNull: true},
    material: {type: DataTypes.STRING, allowNull: true},
    img: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: true}
});

module.exports = {Sneakers};