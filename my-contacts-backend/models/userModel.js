const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    req: true,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
