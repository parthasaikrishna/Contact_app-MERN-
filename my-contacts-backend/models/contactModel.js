const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter contact name"],
    },
    email: {
      type: String,
      required: [true, "please enter your contact email"],
    },
    contact: {
      type: String,
      required: [true, "please enter your contact number"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
