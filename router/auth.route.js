import { signup, signin } from "./../controller/auth.controller";
import express, { Router } from "express";
const expressApp = express();
const router = express.Router();

// expressApp.use(function (req, res, next) {
//   res.header(
//     "Access-Control-Allow-Headers",
//     "x-access-token, Origin, Content-Type, Accept"
//   );
//   next();
// });

router.post("/signup", signup);
router.post("/signin", signin);

export default router;
