const express = require("express");
const { registerAdmin, loginAdmin, getProfile } = require("../controllers/adminController");
const { authorization, verifyAdminRole} = require("../middleware/authorisationHandler");
const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/profile", authorization, verifyAdminRole,  getProfile);
module.exports = router;