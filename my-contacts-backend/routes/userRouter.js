const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/usersController");

const verifyToken = require("../middleware/accessToken");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current" ,currentUser ,verifyToken);

module.exports = router;
