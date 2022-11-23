const Categories = require("./../model/Category");

const categoryNameValidtor = async (req, res, next) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Category name is required",
    });
  }
  next();
};

const findcategoryValidtor = async (req, res, next) => {
  const id = req.params.id;
  if (id) {
    const category = await Categories.findByPk(id);
    if (!category) {
      res.status(404).write(`Category by id: ${id} not found.`);
      res.end();
    }
  }
  next();
};

const validator = { categoryNameValidtor, findcategoryValidtor };

module.exports = validator;
