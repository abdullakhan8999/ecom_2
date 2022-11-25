const dbConnection = require("./../config/db.config");
const Sequelize = require("sequelize");

// Role
module.exports = dbConnection.define(
  "role",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      allowNull: false,
      type: Sequelize.DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);
