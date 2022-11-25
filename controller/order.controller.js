const Orders = require("./../model/Orders");
const sequelizeInstance = require("./../config/db.config");
const bodyParser = require("body-parser");
const express = require("express");
const { Sequelize } = require("sequelize");
const expressApp = express();
expressApp.use(bodyParser.json());

// async function createTable() {
//     await sequelizeInstance.sync({
//         force: true
//     });
//     console.log("Orders table created successfully");
// }

async function orderOrders() {
  await Orders.bulkCreate([
    {
      name: "Samsung Galaxy Note",
      categoryId: 1,
      price: 18000,
    },
    {
      name: "Iphone 13",
      categoryId: 1,
      price: 60000,
    },
    {
      name: "Sony bravia",
      categoryId: 2,
      price: 40000,
    },
    {
      name: "Boat Rugged",
      categoryId: 4,
      price: 4000,
    },
    {
      name: "JBL Storm",
      categoryId: 3,
      price: 9000,
    },
    {
      name: "Vu 5",
      categoryId: 3,
      price: 32000,
    },
  ]);
}

// createTable();
// insertOrders();

const getAllOrders = async (req, res) => {
  const categoryId = req.query.categoryId;
  const minPrice = req.query.minPrice;
  const maxPrice = req.query.maxPrice;
  const orders = [];

  if (Object.keys(req.query).length == 0) {
    Orders = await Orders.findAll();
  } else {
    if (categoryId && !(minPrice || maxPrice)) {
      Orders = await filterByCategory(categoryId);
    } else if (!categoryId && minPrice && maxPrice) {
      Orders = await filterByPriceRange(minPrice, maxPrice);
    } else {
      Orders = await Orders.findAll({
        where: {
          categoryId: categoryId,
          price: {
            [Sequelize.Op.gte]: minPrice,
            [Sequelize.Op.lte]: maxPrice,
          },
        },
      });
    }
  }
  res.status(200).json(Orders);
  res.end();
};

const filterByCategory = async (categoryId) => {
  const filteredOrders = await Orders.findAll({
    where: {
      categoryId: categoryId,
    },
  });
  return filteredOrders;
};
const filterByPriceRange = async (min, max) => {
  const filterOrders = await Orders.findAll({
    where: {
      price: {
        [Sequelize.Op.gte]: min,
        [Sequelize.Op.lte]: max,
      },
    },
  });
  return filterOrders;
};

const getProductById = async (req, res) => {
  const id = req.params.OrdersId;
  if (!id) {
    res.status(400).send("ID not passed");
  }
  const Orders = await Orders.findAll({
    where: {
      id: id,
    },
  });
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.write(JSON.stringify(Orders));
  res.end();
};

const addNewProduct = async (req, res, next) => {
  nameToAdd = req.body.name;
  priceToAdd = req.body.price;
  categoryIdToAdd = req.body.categoryId;
  await Orders.create({
    name: nameToAdd,
    price: priceToAdd,
    categoryId: categoryIdToAdd,
  });
  res.status(201).send("New Prouct add ho gaya hai !");
  res.end();
};

const deconsteAproduct = async (req, res, next) => {
  const id = req.params.OrdersId;
  await Orders.destroy({
    where: {
      id: id,
    },
  });
  res.status(200).send("Prouct Deconste ho gaya hai!");
  res.end();
};

const updateMyProduct = async (req, res, next) => {
  if (!req.body.name) {
    res.status(500).send("Name to bhejo phle!");
    res.end();
  }

  const idToUpdate = req.params.OrdersId;
  const productToUpdate = {
    name: req.body.name,
    price: req.body.price,
    categoryId: req.body.categoryId,
  };
  await Orders.update(productToUpdate, {
    where: {
      id: idToUpdate,
    },
  });
  const updatedProduct = await Orders.findByPk(idToUpdate);
  res.status(200).send(updatedProduct);
  res.end();
};

module.exports = {
  getAllOrders,
  getProductById,
  addNewProduct,
  deconsteAproduct,
  updateMyProduct,
  insertOrders,
};
