const constants = require("../constants");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode | 500;
  switch (statusCode) {
    case constants.BAD_REQUEST:
      res.status(400).json({
        name: "Validation Error",
        stackTrace: err.stack,
      });
      break;
    case constants.UNATHORIZED:
      res.status(401).json({
        name: "Unathorized",
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.status(403).json({
        name: "Forbidden",
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.status(404).json({
        name: "Request Not Found",
        stackTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.status(404).json({
        name: "Server Error",
        stackTrace: err.stack,
      });
      break;
    default:
      console.log("There is no error");
  };
  next();
};

module.exports = errorHandler;
