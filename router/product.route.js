const express = require("express");
const router = express.Router();
const ProductController = require("./../controller/product.controller");
const validator = require("./../middlewares/RequestValidator");
router.get("/", ProductController.findallProduct);
router.get("/:id", [validator.productIdValidtor], ProductController.findById);

//adding product
router.post("/", [validator.bodyValidtor], ProductController.postProduct);

//delect product
router.delete(
  "/:id",
  [validator.productIdValidtor],
  ProductController.deleteProduct
);

//update product
router.put(
  "/:id",
  [validator.productIdValidtor, validator.bodyValidtor],
  ProductController.updateProduct
);

module.exports = router;
