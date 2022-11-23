const express = require("express");
const router = express.Router();
const CategoryController = require("./../controller/category.controller");

// This is for explaination
// router.get("/", (req, res, next) => {
//   res.send("This is the category route.");
//   res.end();
// });

// get all category
router.get("/", CategoryController.findallCategory);
// get category by id
router.get("/:id", CategoryController.findById);
//Add new element
router.post("/", CategoryController.postCategory);
//Delect category
router.delete("/:id",CategoryController.deleteCategory)
//update category
router.put("/:id",CategoryController.updateCategory)
module.exports = router;
