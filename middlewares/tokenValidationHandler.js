const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const tokenValidation = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  let token;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  } else {
    res.status(400);
    throw new Error("Token is missing in the headers");
  }
  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) {
      res.status(401);
      throw new Error("Validation error while decoding the token from headers");
    }
    req.user = decoded.user;
    next();
  });
  if (!token) {
    res.status(401);
    throw new Error("User is not authorized or token is missing");
  }
});

module.exports = tokenValidation;
