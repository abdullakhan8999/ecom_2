const jwt = require("jsonwebtoken");
const config = require("./../config/auth.config");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.status(401).json({
      message: "Unauthorized ",
    });
    return;
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = {
  verifyToken,
};
