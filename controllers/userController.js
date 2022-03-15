const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const User = require("../models/userModel");

exports.register = async (req, res, next) => {
  const { firstName, lastName, contactNo, email, password } = req.body;
  try {
    const existingUser= await User.findOne({email})
    if(existingUser) return res.status(404).send("User-email already exists");
    const userObj = { firstName, lastName, contactNo, email, role: "user" };
    const hashedPwd = await hash(password, 12);
    userObj.password = hashedPwd;
    const user = await new User(userObj).save();
    const token = sign({ user }, process.env.JWT_SECRET,);
    return res
      .status(201)
      .json({ token, user: { ...user._doc, password: null } });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).lean();
    if (!user) return res.status(404).send("Invalid credentials");
    const isMatch = await compare(password, user.password);
    if (!isMatch) return res.status(400).send("Wrong Email or Password");
    const token = sign({ user }, process.env.JWT_SECRET, { expiresIn: 360000 });
    return res.status(200).json({ token, user: { ...user, password: null } });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


