const db = {};

db.roles = require("./Roles");
db.user = require("./User");
db.product = require("./Product");
db.cart = require("./Cart");

db.roles.belongsToMany(db.user, {
  through: "user_Roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.roles, {
  through: "user_Roles",
  foreignKey: "userId",
  otherKey: "roleId",
});
db.product.belongsToMany(db.cart, {
  through: "user_Roles",
  foreignKey: "productId",
  otherKey: "cartId",
});
db.cart.belongsToMany(db.product, {
  through: "user_Roles",
  foreignKey: "cartId",
  otherKey: "productId",
});

db.Roles = ["user", "admin"];

module.exports = db;
