const controller = require("./../controller/auth.controller");
const express = require("express");
const expressApp = express();
const router = express.Router();
const validator = require("./../middlewares/RequestValidator");
const verifySignUp = require("./../middlewares/VErifySignUp");

expressApp.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post("/signup", [verifySignUp.checkDupName], controller.signup);
router.post("/signin", controller.signin);

module.exports = router;
