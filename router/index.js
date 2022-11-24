const express = require("express");
const categoryRoute = require("./category.router");
const productRoute = require("./product.route");
const authRoute = require("./auth.route");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send(`This is the basic route.`);
  res.end();
});

router.use("/ecomm/api/v2/categories", categoryRoute);
router.use("/ecomm/api/v2/products", productRoute);
router.use("/ecomm/api/v2/auth", authRoute);
module.exports = router;
