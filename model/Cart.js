const dbConnection = require("./../config/db.config");
const sequelize = require("sequelize");
//Cart
module.exports = dbConnection.define(
  "cart",
  {
    id: {
      primaryKey: true,
      allowNull: true,
      type: sequelize.DataTypes.INTEGER,
      autoIncrement: true,
    },
    cost: {
      allowNull: false,
      type: sequelize.DataTypes.BIGINT,
    },
  },
  {
    timestamps: false,
  }
);
