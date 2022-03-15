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

exports.getProducts = async (req, res, next) => {
  const { limit, skip, search } = req.query;
  const numLimit=Number(limit)
  const numSkip=Number(skip)
  try {
    let result
    let find
    if (search) {
      find=await Product.find({"email": {$regex: '^' + search, $options: 'i'}})
      result=await Product.find({"email": {$regex: '^' + search, $options: 'i'}}).limit(numLimit).skip(numLimit*numSkip)
    } else {
      
      find=await Product.find({})
      result=await Product.find({}).limit(numLimit).skip(numLimit*numSkip)
    }
    
    return res.status(200).json({length:find.length,result});
  } catch (error) {
    return res.status(500).json(error);
  }
};

