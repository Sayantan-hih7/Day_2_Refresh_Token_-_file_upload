const express = require("express");
const { registerUser, loginUser, refreshToken, getProfile } = require("../controllers/userController");
const { authorization, verifyUserRole } = require("../middleware/authorisationHandler");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authorization, verifyUserRole, getProfile);

module.exports = router;