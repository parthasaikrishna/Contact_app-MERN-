const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).send("All fields are required");
  }
  const isAvailable = await User.find({ email });
  if (isAvailable) {
    res.status(400).send("user already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  res.status(201).json(user);
  res.send("User registered");
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("All fields are required");
  }
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        id: user._id,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(200).json({ token });
  } else {
    return res.status(400).send("Invalid credentials");
  }
};

const currentUser = (req,res)=>{
    res.json(req.user);
}

module.exports = { registerUser, loginUser,currentUser };
