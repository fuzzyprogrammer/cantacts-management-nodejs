const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");
const router = express.Router();
const tokenValidation = require('../middlewares/tokenValidationHandler');

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current/", tokenValidation ,currentUser);

module.exports = router;
