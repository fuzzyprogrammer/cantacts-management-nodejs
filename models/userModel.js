const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide valid username"],
    },
    email: {
      type: String,
      required: [true, "Please provide valid email"],
      unique: [true, "This email has already taken"],
    },
    password: {
      type: String,
      required: [true, "Please provide valid password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
