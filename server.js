const express = require("express");
const bodyparser = require("body-parser");
const serverConfig = require("./config/server.config");
const router = require("./router/index");
const ErrorHandler = require("./middlewares/ErrorHandler");
//here creating table when sever is up and running
const dbConnection = require("./config/db.config");
const Categories = require("./model/Category");
const Products = require("./model/Product");

Categories.hasMany(Products);
const App = express();
App.use(bodyparser.json());
App.use(router);
App.use(ErrorHandler); //always at end

const init = async () => {
  await dbConnection.sync({ force: true });
  insertCategories();
  insertProducts();
};
const insertCategories = async () => {
  await Categories.bulkCreate([
    {
      name: "Fashion",
    },
    {
      name: "Mobile",
    },
    {
      name: "Electronics",
    },
    {
      name: "Appliances",
    },
  ]);
};
const insertProducts = async () => {
  await Products.bulkCreate([
    {
      name: "Hrx",
      categoryId: 1,
      price: 18000,
    },
    {
      name: "Iphone 13",
      categoryId: 2,
      price: 60000,
    },
    {
      name: "Sony bravia",
      categoryId: 3,
      price: 40000,
    },
    {
      name: "Boat Rugged",
      categoryId: 4,
      price: 4000,
    },
    {
      name: "JBL Storm",
      categoryId: 4,
      price: 9000,
    },
    {
      name: "Vu 5",
      categoryId: 3,
      price: 32000,
    },
  ]);
};

App.listen(serverConfig.PORT, () => {
  console.log(`Serveris running on http://localhost:${serverConfig.PORT} `);
  // init();
});
