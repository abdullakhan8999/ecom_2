const express = require("express");
const router = express.Router();
const CategoryController = require("./../controller/category.controller");
const validator = require("./../middlewares/RequestValidator");
// /ecomm/api/v2/categories

// This is for explaination
// router.get("/", (req, res, next) => {
//   res.send("This is the category route.");
//   res.end();
// });

// get all category
router.get("/", CategoryController.findallCategory);

// get category by id
router.get(
  "/:id",
  [validator.findcategoryValidtor],
  CategoryController.findById
);

//Add new element
router.post(
  "/",
  [validator.categoryNameValidtor],
  CategoryController.postCategory
);
//Delect category
router.delete(
  "/:id",
  [validator.findcategoryValidtor],
  CategoryController.deleteCategory
);
//update category
router.put(
  "/:id",
  [validator.findcategoryValidtor, validator.categoryNameValidtor],
  CategoryController.updateCategory
);
module.exports = router;
