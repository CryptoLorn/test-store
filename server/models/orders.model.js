const {DataTypes} = require("sequelize");

const sequelize = require("../db");

const Orders = sequelize.define('orders', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    model: {type: DataTypes.STRING, unique: false, allowNull: false},
    brand_name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    size: {type: DataTypes.DOUBLE, allowNull: false}
});

module.exports = {Orders};