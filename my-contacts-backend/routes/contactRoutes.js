const express = require("express");
const router = express.Router();
const {
  getContact,
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactsController");

const verifyToken = require("../middleware/accessToken");

// Protect ALL routes with verifyToken
router.route("/").get(verifyToken, getContacts).post(verifyToken,createContact);

router
  .route("/:id")
  .get(verifyToken, getContact)
  .put(verifyToken, updateContact)
  .delete(verifyToken, deleteContact);

module.exports = router;
