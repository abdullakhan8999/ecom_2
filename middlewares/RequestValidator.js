const Categories = require("./../model/Category");
const Products = require("./../model/Product");

const nameValidtor = async (req, res, next) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Category name is required",
    });
  }
  next();
};

const categoryIdValidtor = async (req, res, next) => {
  const id = req.params.id;
  if (id) {
    const category = await Categories.findByPk(id);
    if (!category) {
      res.status(404).write(`Category by id: ${id} dose not exist.`);
      res.end();
    }
  }
  next();
};

const productIdValidtor = async (req, res, next) => {
  const id = req.params.id;
  if (id) {
    const product = await Products.findByPk(id);
    if (!product) {
      res.status(404).write(`Category by id: ${id} dose not exist.`);
      res.end();
    }
  }
  next();
};

// const porductFilterValidator = async (req, res, next) => {
//   const categoryId = req.query.categoryId;
//   const products = await Products.findAll({
//     where: { categoryId: categoryId },
//   });
//   if (!products) {
//     res.status(404).write(`Category by id: ${id} dose not exist.`);
//     res.end();
//   }
//   next();
// };

const validator = {
  nameValidtor,
  categoryIdValidtor,
  productIdValidtor,
  // porductFilterValidator,
};

module.exports = validator;
