const { Router } = require("express");

const adminController = require("../controllers/adminController");  

const router = Router({ strict: true });

router.post("/login", adminController.login);
router.post("/register", adminController.register);
router.get("/users", adminController.getUsers);
router.patch("/update-user/:id", adminController.updateUser);
router.delete("/delete-user/:id", adminController.deleteUser);
router.get("/vendors", adminController.getVendors);
router.patch("/update-vendor/:id", adminController.updateVendor);
router.delete("/delete-vendor/:id", adminController.deleteVendor);

module.exports = router;
