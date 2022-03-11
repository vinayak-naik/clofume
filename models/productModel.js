const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  vendorId: {
    type: String,
    required: [true, "vendorId is required"],
  },
  type: {
    type: String,
    required: [true, "Type is required"],
    enum:["customProduct","readyToWear","alterations"]
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  longDesc: {
    type: String,
    required: [true, "LongDesc is required"],
  },
  shortDesc: {
    type: String,
    required: [true, "ShortDesc is required"],
  },
  basePrice: {
    type: String,
    required: [true, "BasePrice is required"],
  },
  tagName: {
    type: String,
    required: [true, "TagName is required"],
  },
  url: {
    type: Array,
    required: [true, "Url is required"],
  },
  categories: {
      gender:{
        type: String,
        required: [true, "Gender is required"]
      },
      typeOfWear:{
        type: String,
        required: [true, "Tender is required"]
      },
      wearCategory:{
        type: String,
        required: [true, "WearCategory is required"]
      },

    
  },

}, {
  timestamps: true
});

module.exports = mongoose.model("Product", productSchema);