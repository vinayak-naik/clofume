const { Router } = require("express");

// const isVendor = require("../middleware/is-vendor");
const vendorController = require("../controllers/vendorController");  

const router = Router({ strict: true });

router.post("/login", vendorController.login);
router.post("/register", vendorController.register);

module.exports = router;
