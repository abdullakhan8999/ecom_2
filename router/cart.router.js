const express = require("express");
const cartRouter = express.Router();
const authJwt = require("./../middlewares/authjwt");
const cartController = require("./../controller/cart.controller");

cartRouter.post("/", cartController.createCart);

cartRouter.put("/cartID", cartController.updateCart);
cartRouter.get("/cartID", cartController.getCart);

module.exports = cartRouter;
