const {Brand} = require("./Brand/brand.model");
const {User} = require("./User/user.model");
const {Basket} = require("./Basket/basket.model");
const {Sneakers} = require("./Sneakers/sneakers.model");
const {Type} = require("./Type/type.model");
const {Orders} = require("./Orders/orders.model");
const {TypeBrand} = require("./TypeBrand/typeBrand.model");

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

Type.belongsToMany(Brand, {through: TypeBrand});
Brand.belongsToMany(Type, {through: TypeBrand});