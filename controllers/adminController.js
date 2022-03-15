const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const Admin = require("../models/adminModel");
const User = require("../models/userModel");
const Vendor = require("../models/vendorModel");

exports.register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingadmin= await Admin.findOne({email})
    if(existingadmin) return res.status(404).send("admin-email already exists");
    const hashedPwd = await hash(password, 12);
    const adminObj = { email, password:hashedPwd};
    const admin = await new Admin(adminObj).save();
    const token = sign({ admin }, process.env.JWT_SECRET, { expiresIn: 360000 });
    return res
      .status(201)
      .json({ token, admin: { ...admin._doc, password: null } });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email }).lean();
    if (!admin) return res.status(404).send("Invalid credentials");
    const isMatch = await compare(password, admin.password);
    if (!isMatch) return res.status(400).send("Wrong Email or Password");
    const token = sign({ admin }, process.env.JWT_SECRET, { expiresIn: 360000 });
    return res.status(200).json({ token, admin: { ...admin, password: null } });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getUsers = async (req, res, next) => {
  const { limit, skip,search } = req.query;
  const numLimit=Number(limit)
  const numSkip=Number(skip)
  try {
    let result
    let find
    if (search) {
      find=await User.find({"email": {$regex: '^' + search, $options: 'i'}})
      result=await User.find({"email": {$regex: '^' + search, $options: 'i'}}).limit(numLimit).skip(numLimit*numSkip)
    } else {
      
      find=await User.find({})
      result=await User.find({}).limit(numLimit).skip(numLimit*numSkip)
    }
    
    return res.status(200).json({length:find.length,result});
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).lean();
    if (!user) return res.status(400).send("User does not exist");
    const userObj = { ...req.body };
    if (req.body.password) {
      const hashedPWD = await hash(req.body.password, 12);
      userObj.password = hashedPWD;
    }
    const newUser = await User.findByIdAndUpdate(
      { _id: id },
      { ...userObj },
      { new: true }
    );
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  console.log(id)
  try {
    const response=await User.deleteOne({_id:id})
    console.log(response)
    if (response.deletedCount > 0) {
      return res.status(200).send("User has been deleted");
    } else {
      return res.status(200).send("Couldn't find user");
    }
    
  } catch (error) {
    return res.status(500).json(error);
  }
};











exports.getVendors = async (req, res, next) => {
  const { limit, skip,search } = req.query;
  const numLimit=Number(limit)
  const numSkip=Number(skip)
  try {
    let result
    let find
    if (search) {
      find=await Vendor.find({"email": {$regex: '^' + search, $options: 'i'}})
      result=await Vendor.find({"email": {$regex: '^' + search, $options: 'i'}}).limit(numLimit).skip(numLimit*numSkip)
    } else {
      
      find=await Vendor.find({})
      result=await Vendor.find({}).limit(numLimit).skip(numLimit*numSkip)
    }
    
    return res.status(200).json({length:find.length,result});
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateVendor = async (req, res, next) => {
  const { id } = req.params;
  try {
    const vendor = await Vendor.findById(id).lean();
    if (!vendor) return res.status(400).send("vendor does not exist");
    const vendorObj = { ...req.body };
    if (req.body.password) {
      const hashedPWD = await hash(req.body.password, 12);
      vendorObj.password = hashedPWD;
    }
    const newVendor = await Vendor.findByIdAndUpdate(
      { _id: id },
      { ...vendorObj },
      { new: true }
    );
    return res.status(200).json(newVendor);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteVendor = async (req, res, next) => {
  const { id } = req.params;
  console.log(id)
  try {
    const response=await Vendor.deleteOne({_id:id})
    console.log(response)
    if (response.deletedCount > 0) {
      return res.status(200).send("vendor has been deleted");
    } else {
      return res.status(200).send("Couldn't find vendor");
    }
    
  } catch (error) {
    return res.status(500).json(error);
  }
};


