const express = require("express");
const { refreshToken } = require("../controllers/refreshTokenController");
const router = express.Router();

router.post("/refresh", refreshToken);

module.exports = router;