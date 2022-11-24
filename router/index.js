const express = require("express");
const router = express.Router();
const categoryRoute = require("./category.router");
const productRoute = require("./product.route");
const AuthRoute = require("./auth.route").default;

router.get("/", (req, res, next) => {
  res.send(`This is the basic route.`);
  res.end();
});

router.use("/ecomm/api/v2/categories", categoryRoute);
router.use("/ecomm/api/v2/products", productRoute);
router.use("/ecomm/api/v2/auth", AuthRoute);
module.exports = router;
