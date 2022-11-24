const controller = require("./../controller/auth.controller");
const express = require("express");
const expressApp = express();
const router = express.Router();

router.post("/signup", controller.signup);
router.post("/signin", controller.signin);

module.exports = router;
