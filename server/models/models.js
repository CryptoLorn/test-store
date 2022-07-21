const {DataTypes} = require('sequelize');

const sequelize = require('../db');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
});

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});

const BasketSneaker = sequelize.define('basket_sneaker', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});

const Sneaker = sequelize.define('sneaker', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: true},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false}
});

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
});

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
});

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false}
});

const SneakerInfo = sequelize.define('sneaker_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
});

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketSneaker);
BasketSneaker.belongsTo(Basket);

Type.hasMany(Sneaker);
Sneaker.belongsTo(Type);

Brand.hasMany(Sneaker);
Sneaker.belongsTo(Brand);

Sneaker.hasMany(Rating);
Rating.belongsTo(Sneaker);

Sneaker.hasMany(BasketSneaker);
BasketSneaker.belongsTo(Sneaker);

Sneaker.hasMany(SneakerInfo, {as: 'info'});
SneakerInfo.belongsTo(Sneaker);

Type.belongsToMany(Brand, {through: TypeBrand});
Brand.belongsToMany(Type, {through: TypeBrand});

module.exports = {
    User,
    Basket,
    BasketSneaker,
    Sneaker,
    Type,
    Brand,
    Rating,
    TypeBrand,
    SneakerInfo
};