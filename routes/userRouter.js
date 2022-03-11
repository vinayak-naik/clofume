const { Router } = require("express");

const isUser = require("../middleware/is-user");
const userController = require("../controllers/userController");  

const router = Router({ strict: true });

router.post("/login", userController.login);
router.post("/register", userController.register);

module.exports = router;
