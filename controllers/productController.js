const Product = require("../models/productModel");

exports.add = async (req, res, next) => {

  const { vendorId, type, name, longDesc, shortDesc, basePrice, tagName, url, categories } = req.body;
  try {
    const productObj={ vendorId, type, name, longDesc, shortDesc, basePrice, tagName, url, categories }
    const product = await new Product(productObj).save();
    return res
      .status(201)
      .json({ product });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}; 

