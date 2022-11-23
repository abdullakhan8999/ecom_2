const sequelize = require("sequelize");
const db_Connection = require("./../config/db.config");

module.exports = db_Connection.define(
  "product",
  {
    id: {
      primaryKey: true,
      allowNull: true,
      type: sequelize.DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      allowNull: false,
      type: sequelize.DataTypes.STRING,
    },
    categoryId: {
      allowNull: false,
      type: sequelize.DataTypes.INTEGER,
    },
    price: {
      allowNull: false,
      type: sequelize.DataTypes.BIGINT,
    },
  },
  {
    timestamps: false,
  }
);
