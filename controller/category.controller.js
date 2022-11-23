const Categories = require("./../model/Category");
const sequelizeInstance = require("./../config/db.config");

// create table
const createTable = async () => {
  await sequelizeInstance.sync({ force: true });
  insertCategories();
  console.log("Table create");
};

// insert values in table
const insertCategories = async () => {
  await Categories.bulkCreate([
    {
      name: "Fashion",
    },
    {
      name: "Mobile",
    },
    {
      name: "Electronics",
    },
    {
      name: "Appliances",
    },
  ]);
};

// get all category
const findallCategory = async (req, res, next) => {
  const category = await Categories.findAll();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(category, null, 2));
  res.end();
};

// get category by id
const findById = async (req, res, next) => {
  const id = await req.params.id;
  const category = await Categories.findByPk(id);
  try {
    res.write(`Id: ${id} detailes \n${JSON.stringify(category, null, 2)}`);
    res.end();
  } catch (error) {
    next(error);
  }
};

//Post new category
const postCategory = async (req, res, next) => {
  try {
    //This is replaced with validation
    let categoryToAdd = req.body;
    await Categories.create(categoryToAdd);
    res.status(201).send("New category added");
    res.end();
  } catch (err) {
    next(err);
  }
};

//Delect category by id
const deleteCategory = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Categories.destroy({ where: { id: id } });
    res.status(201).write("Category delected");
    res.end();
  } catch (error) {
    next(error);
  }
};

//update Category
const updateCategory = async (req, res, next) => {
  const id = req.params.id;
  try {
    const categoryupdate = {
      name: req.body.name,
    };
    await Categories.update(categoryupdate, { where: { id: id } });
    const updatedCategory = await Categories.findByPk(id);
    res
      .status(200)
      .write(`Updated Category: ${JSON.stringify(updatedCategory, null, 2)}`);
    res.end();
  } catch (error) {
    next(error);
  }
};

const all = {
  findallCategory,
  findById,
  postCategory,
  deleteCategory,
  updateCategory,
};
module.exports = all;
