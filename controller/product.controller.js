const Products = require("./../model/Product");
const sequelizeInstance = require("./../config/db.config");

// create table
const createTable = async () => {
  await sequelizeInstance.sync({ force: true });
  insertProducts();
  console.log("Table create");
};

// insert values in table
const insertProducts = async () => {
  await Products.bulkCreate([
    {
      name: "Hrx",
      categoryId: 1,
      price: 18000,
    },
    {
      name: "Iphone 13",
      categoryId: 2,
      price: 60000,
    },
    {
      name: "Sony bravia",
      categoryId: 3,
      price: 40000,
    },
    {
      name: "Boat Rugged",
      categoryId: 4,
      price: 4000,
    },
    {
      name: "JBL Storm",
      categoryId: 4,
      price: 9000,
    },
    {
      name: "Vu 5",
      categoryId: 3,
      price: 32000,
    },
  ]);
};

const findallProduct = async (req, res, next) => {
  const product = await Products.findAll();

  // res.writeHead(statusCode {constent Type})
  res.writeHead(200, { "Content-Type": "application/json" });

  res.write(JSON.stringify(product, null, 2));
  res.end();
};

const findById = async (req, res, next) => {
  const id = await req.params.id;
  const product = await Products.findByPk(id);
  try {
    if (!product) {
      throw new Error(`product by id: ${id} not found.`);
    }
    res.write(`Id: ${id} detailes \n${JSON.stringify(product, null, 2)}`);
    res.end();
  } catch (error) {
    next(error);
  }
};

const postProduct = async (req, res, next) => {
  const body = req.body;
  try {
    //This is replaced with validation
    // if (!body.name) throw new Error("Please enter then product details");
    await Products.create(body);
    res.status(201).send("New product added");
    res.end();
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  const product = Products.findByPk(id);
  try {
    if (!product) {
      throw new Error("Product is not found");
    }
    await Products.destroy({ where: { id: id } });
    res.status(201).send("Product Delected");
    res.end();
  } catch (error) {
    next(error);
  }
};

//update Product
const updateProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
    if (!req.body.name) {
      throw new Error("Please Pass body.");
    }
    const product = await Products.findByPk(id);
    if (!product) throw new Error("Product not found");
    const productupdate = {
      name: req.body.name,
    };
    await Products.update(productupdate, { where: { id: id } });
    const updatedProduct = await Products.findByPk(id);
    res
      .status(200)
      .write(`Updated Product: ${JSON.stringify(updatedProduct, null, 2)}`);
    res.end();
  } catch (error) {
    next(error);
  }
};

// createTable();
const all = {
  findallProduct,
  findById,
  postProduct,
  deleteProduct,
  updateProduct,
};
module.exports = all;
