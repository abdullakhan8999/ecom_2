const db = require("./../model/index");
// const config = require("./../config/auth.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Sequelize } = require("sequelize");
const User = db.user;
const Roles = db.roles;

const signup = async (req, res) => {
  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  if (req.body.roles) {
    const roles = await Roles.findAll({
      where: {
        name: {
          [Sequelize.Op.or]: req.body.roles,
        },
      },
    });

    await user.setRoles(roles);
    res.status(200).json({
      message: "User registered successfully",
    });
  }
};

const signin = async (req, res) => {};

module.exports = { signin, signup };
