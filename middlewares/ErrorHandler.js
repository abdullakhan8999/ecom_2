const path = require("path");
const ErrorHandler = (err, req, res, next) => {
  console.log("Middleware Error Handler`");
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  res.sendFile(path.join(__dirname + "./../views/error.html"));
};

module.exports = ErrorHandler;
