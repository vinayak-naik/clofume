const { Router } = require("express");

const productController = require("../controllers/productController");  

const router = Router({ strict: true });

router.post("/add", productController.add);
// router.post("/register", productController.remove);

module.exports = router;