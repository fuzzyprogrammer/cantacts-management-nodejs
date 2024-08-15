const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc Register User
//@route POST /api/users/register
//@access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error("User already registered");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (!newUser) {
    req.status(400);
    throw new Error("New user cannot be created");
  }
  res.status(201).json(newUser);
});

//@desc Login User
//@route POST /api/users/login
//@access PUBLIC
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  if (user && bcrypt.compare(password, user.password)) {
    const accessToken = jwt.sign(
      {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        }
      },
      process.env.SECRET_TOKEN,
      { expiresIn: "30m" }
    );
    res.status(200).json(accessToken);
  }
  console.log("JWT secret token value", process.env.SECRET_TOKEN);
});

//@desc Current User
//@route GET /api/users/current
//@access PRIVATE
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
