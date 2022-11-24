const db = {};

db.roles = require("./Roles");
db.user = require("./User");

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

db.Roles = ["user", "admin"];

module.exports = db;
