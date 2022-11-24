const Products = require("./../model/Product");
const sequelizeInstance = require("./../config/db.config");
const sequelize = require("sequelize");
//  Product Api /ecomm/api/v2/products
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
  const categoryId = req.query.categoryId;
  const minPrice = req.query.minPrice;
  const maxPrice = req.query.maxPrice;
  let products = [];
  if (Object.keys(req.query).length == 0) {
    products = await Products.findAll();
  } else {
    if (categoryId && !(minPrice || maxPrice)) {
      // this is Api for filter ?categoryId=3
      products = await filterBYCategoryID(categoryId);
    } else if (!categoryId && minPrice && maxPrice) {
      //this is Api for filter by range ?minPrice=1000&maxPrice=15000
      products = await filter_ProductsBy_Range(minPrice, maxPrice);
    } else {
      products = await Products.findAll({
        where: {
          categoryId: categoryId,
          price: {
            [sequelize.Op.gte]: minPrice,
            [sequelize.Op.lte]: maxPrice,
          },
        },
      });
    }
  }
  res.writeHead(200, { "Content-Type": "application/json" }); //(statusCode{constent Type})
  res.write(JSON.stringify(products, null, 2));
  res.end();
};

const filterBYCategoryID = async (categoryId) => {
  const filtered_Products = await Products.findAll({
    where: { categoryId: categoryId },
  });
  return filtered_Products;
};
const filter_ProductsBy_Range = async (minPrice, maxPrice) => {
  const filtered_Products = await Products.findAll({
    where: {
      price: {
        [sequelize.Op.gte]: minPrice,
        [sequelize.Op.lte]: maxPrice,
      },
    },
  });
  return filtered_Products;
};

const findById = async (req, res, next) => {
  const id = await req.params.id;
  const product = await Products.findByPk(id);
  try {
    res.write(`Id: ${id} detailes \n${JSON.stringify(product, null, 2)}`);
    res.end();
  } catch (error) {
    next(error);
  }
};

const postProduct = async (req, res, next) => {
  const body = req.body;
  try {
    await Products.create(body);
    res.status(201).send("New product added");
    res.end();
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
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
