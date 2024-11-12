const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../helper/generateToken");

const refreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (refreshToken) {
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("Invalid refresh token. Please log in again.");
      }
      if (decoded) {
        const accessToken = generateAccessToken(decoded.id, decoded.role);
        res.json({ message: "Token refreshed", accessToken });
      }
    });
  } else {
    res.status(401);
    throw new Error("No refresh token found. Please provide a refresh token.");
  }
});

module.exports = { refreshToken };
