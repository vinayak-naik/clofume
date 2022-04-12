const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, "Firstname is required"],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Lastname is required"],
  },
  contactNo: {
    type: String,
    required: [true, "ContactNo is required"],
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Password is required"],
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);
