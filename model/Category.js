const sequelize = require("sequelize");
const db_Connection = require("./../config/db.config");

module.exports = db_Connection.define(
  "categories",
  {
    id: {
      primaryKey: true,
      allowNull: false,
      type: sequelize.DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      allowNull: false,
      type: sequelize.DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);
