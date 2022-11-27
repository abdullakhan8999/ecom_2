const db = require("./../model/index");
const Roles = db.Roles;
const User = db.user;

const checkDupName = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });

  if (user) {
    res.status(400).json({
      message: "User already exist",
    });
    return;
  }
  next();
};

module.exports = {
  checkDupName: checkDupName,
};
