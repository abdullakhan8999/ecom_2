const express = require("express");
const bodyparser = require("body-parser");
const serverConfig = require("./config/server.config");
const router = require("./router/index");
const ErrorHandler = require("./middlewares/ErrorHandler");
const App = express();
App.use(bodyparser.json());
App.use(router);
// App.use(ErrorHandler); //always at end

// const Category = require("./model/Category");
// const Product = require("./model/Product");

App.listen(serverConfig.PORT, () => {
  console.log(`Serveris running on http://localhost:${serverConfig.PORT}`);
  // Category.hasMany(Product);
});
