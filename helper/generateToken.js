const jwt = require("jsonwebtoken");

const generateAccessToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_ACCESS_SECRET, { expiresIn: "7d" });
};

const generateRefreshToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_REFRESH_SECRET, { expiresIn: "365d" });
};

module.exports = { generateAccessToken, generateRefreshToken };