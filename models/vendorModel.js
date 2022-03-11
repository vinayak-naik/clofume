const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  email: {
    type: String,
    unique:true,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },

}, {
  timestamps: true
});

module.exports = mongoose.model("Vendor", vendorSchema);