const express = require("express");
const router = express.Router();
const ProductController = require("./../controller/product.controller");

router.get("/", ProductController.findallProduct);
router.get("/:id", ProductController.findById);

//adding product
router.post("/", ProductController.postProduct);

//delect product
router.delete("/:id", ProductController.deleteProduct);

//update product
router.put("/:id", ProductController.updateProduct);

module.exports = router;
