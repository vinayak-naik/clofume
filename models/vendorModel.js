const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    contactNo: {
      type: String,
      required: [true, "contactNo is required"],
      unique: true,
    },
    ownerName: {
      type: String,
      required: [true, "ownerName is required"],
    },
    outletName: {
      type: String,
      required: [true, "outletName is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    coverImage: {
      type: String,
      required: [true, "coverImage is required"],
    },
    logo: {
      type: String,
      required: [true, "logo is required"],
    },
    location: {
      latitude: {
        type: String,
        required: [true, "latitude is required"],
      },
      longitude: {
        type: String,
        required: [true, "longitude is required"],
      },
    },
    address: {
      street: {
        type: String,
        required: [true, "street is required"],
      },
      area: {
        type: String,
        required: [true, "area is required"],
      },
      floor: {
        type: String,
        required: [true, "floor is required"],
      },
      pincode: {
        type: String,
        required: [true, "pincode is required"],
      },
      state: {
        type: String,
        required: [true, "state is required"],
      },
      city: {
        type: String,
        required: [true, "city is required"],
      },
      landmark: {
        type: String,
        required: [true, "landmark is required"],
      },
    },
    services: {
      dressMaking: {
        type: Boolean,
        required: true,
      },
      sareeKuch: {
        type: Boolean,
        required: true,
      },
      sareefalls: {
        type: Boolean,
        required: true,
      },
    },
    experiencedin: {
      lehenga: {
        type: Boolean,
        required: true,
      },
      anarkali: {
        type: Boolean,
        required: true,
      },
    },
    specializedIn: {
      men: {
        type: Boolean,
        required: true,
      },
      women: {
        type: Boolean,
        required: true,
      },
    },
    timings: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vendor", vendorSchema);
