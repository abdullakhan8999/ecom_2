const Cart = require("../model/Cart");
const Product = require("../model/Product");
const db = require("./../config/db.config");
const createCart = async (req, res, next) => {
  try {
    await Cart.create({ cost: 0 });
    res.status(200).json({
      meassage: "Cart Create",
    });
  } catch (error) {
    res.status(401).json({
      meassage: "Cart not create due in",
    });
  }
};

let updateCart = async (req, res, next) => {
  const cartId = req.params.cartId;
  let cartToUpdate = await Cart.findByPk(cartId);
  if (cartToUpdate) {
    let productsToAdd = await Product.findAll({
      where: {
        id: req.body.productIds,
      },
    });
    if (productsToAdd) {
      await cartToUpdate.setProducts(productsToAdd);
      console.log("Product Added");
      let totalCost = 0;
      let productSelected = [];
      let products = await cartToUpdate.getProducts();
      for (i = 0; i < products.length; i++) {
        totalCost = totalCost + products[i].price;
        productSelected.push({
          id: products[i].id,
          name: products[i].name,
          cost: products[i].price,
        });
      }
      res.status(200).json({
        id: cartToUpdate.id,
        productSelected,
        cost,
      });
    }
  }
};

const getCart = async (req, res, next) => {
  const cart = await Cart.findByPk(req.params.cartId);
  const totalCost = 0;
  const productsSelected = [];
  const products = await cart.getProducts();
  for (let i = 0; i < products.length; i++) {
    totalCost = cost + products[i].cost;
    productsSelected.push({
      id: products[i].id,
      name: products[i].name,
      cost: products[i].cost,
    });
  }
};

module.exports = {
  createCart,
  updateCart,
  getCart,
};
