const db = require("./../model/index");
const config = require("./../config/auth.config");
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

const signin = async (req, res) => {
  const password = req.body.password;
  const userName = await User.findOne({
    where: { username: req.body.username },
  });

  if (!userName) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }

  const isVaildPassword = bcrypt.compareSync(
    req.body.password,
    userName.password
  );
  if (!isVaildPassword) {
    res.status(401).json({
      message: "Password is incorrect",
    });
    return;
  }

  const token = jwt.sign({ id: userName.id }, config.secret, {
    expiresIn: 86400,
  });

  const authorities = [];
  const roles = await userName.getRoles();
  for (let i = 0; i < roles.length; i++) {
    authorities.push("ROLE_" + roles[i].name.toUpperCase());
  }

  res.status(200).send({
    id: userName.id,
    username: userName.userName,
    email: userName.email,
    roles: authorities,
    accessToken: token,
  });
};

module.exports = { signin, signup };
