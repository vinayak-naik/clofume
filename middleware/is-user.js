const { verify } = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("token");
  if (!token || token === "") {
    req.isAuth = false;
    return res.status(401).send("Authorization failed..No token");
  } else {
    let decoded;

    try {
      decoded = verify(token, process.env.JWT_SECRET);
    } catch (error) {
      req.isAuth = false;
      return res.status(401).send("Authorization failed..22");
    }

    if (!decoded) {
      req.isAuth = false;
      return res.status(401).send("Authorization failed..");
    } else {
      req.isAuth = true;
      req.user = decoded.user;
      req.userData = decoded;
      return next();
    }
  }
};
