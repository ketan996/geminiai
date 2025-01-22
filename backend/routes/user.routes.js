const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUser ,logout } = require("../controller/user.controller");
const { isAuthenticated } = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", isAuthenticated, getUser);
router.get("/logout", logout);


module.exports = router;