const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const Vendor = require("../models/vendorModel");

exports.register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const existingvendor= await Vendor.findOne({email})
    if(existingvendor) return res.status(404).send("vendor-email already exists");
    const vendorObj = req.body;
    const hashedPwd = await hash(password, 12);
    vendorObj.password = hashedPwd;
    const vendor = await new Vendor(vendorObj).save();
    const token = sign({ vendor }, process.env.JWT_SECRET,);
    return res
      .status(201)
      .json({ token, vendor: { ...vendor._doc, password: null } });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const vendor = await Vendor.findOne({ email }).lean();
    if (!vendor) return res.status(404).send("Invalid credentials");
    const isMatch = await compare(password, vendor.password);
    if (!isMatch) return res.status(400).send("Wrong Email or Password");
    const token = sign({ vendor }, process.env.JWT_SECRET, { expiresIn: 360000 });
    return res.status(200).json({ token, vendor: { ...vendor, password: null } });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


