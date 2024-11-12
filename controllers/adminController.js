const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const { hashPassword, comparePassword } = require("../helper/bcryptPass");
const {
    generateAccessToken,
    generateRefreshToken,
  } = require("../helper/generateToken");
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const admin = await Admin.create({
    name,
    email,
    password: await hashPassword(password),
  });

  if (admin) {
    res.status(201).json({
      message: "Admin registered successfully",
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid admin data");
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }
  
    const admin = await Admin.findOne({ email });
  
    if (admin && (await comparePassword(password, admin.password))) {
      res.json({
        admin: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role
        },
        accessToken: generateAccessToken(admin._id, admin.role),
        refreshToken: generateRefreshToken(admin._id, admin.role),
      });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
});

const getProfile = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.user.id);
    if (admin) {
      res.json({
        admin: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role
        },
      });
    } else {
      res.status(404);
      throw new Error("Admin not found");
    }
  });

module.exports = { registerAdmin, loginAdmin, getProfile };
