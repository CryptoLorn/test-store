const {Brand} = require("./brand.model");
const {User} = require("./user.model");
const {Basket} = require("./basket.model");
const {Sneakers} = require("./sneakers.model");
const {Type} = require("./type.model");
const {Orders} = require("./orders.model");
const {TypeBrand} = require("./typeBrand.model");
const {Analytics} = require("./analytics.model");
const {Auth} = require("./auth.model");

User.hasOne(Auth);
Auth.belongsTo(User);

User.hasOne(Basket);
Basket.belongsTo(User);

Basket.hasMany(Orders);
Orders.belongsTo(Basket);

Type.hasMany(Sneakers);
Sneakers.belongsTo(Type);

Brand.hasMany(Sneakers);
Sneakers.belongsTo(Brand);

Sneakers.hasMany(Orders);
Orders.belongsTo(Sneakers);

Sneakers.hasOne(Analytics);
Analytics.belongsTo(Sneakers);

Type.belongsToMany(Brand, {through: TypeBrand});
Brand.belongsToMany(Type, {through: TypeBrand});