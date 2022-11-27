const Categories = require("./../model/Category");
const Products = require("./../model/Product");

const bodyValidtor = async (req, res, next) => {
  if (!req.body) {
    res.status(400).send({
      message: "Body is required",
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
  bodyValidtor,
  categoryIdValidtor,
  productIdValidtor,
  // porductFilterValidator,
};

module.exports = validator;
