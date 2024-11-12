const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel');
const Admin = require('../models/adminModel');

const authorization = asyncHandler(async (req, res, next) => {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                // Get token from header
                token = req.headers.authorization.split(' ')[1]
                const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
                // Send decoded data in req.user according to the role
                if(decoded.role === 'admin') {
                    req.user = await Admin.findById({ _id: decoded.id })
                }
                else if(decoded.role === 'user') {
                    req.user = await User.findById({ _id: decoded.id })
                }
                next()
            } catch (error) {
                console.log(error)
                res.status(401)
                throw new Error('Not authorized')
            }
            
        }
        if (!token) {
            res.status(401)
            throw new Error('Not authorized, no token')
        }
})

const verifyAdminRole = asyncHandler(async (req, res, next) => {
    if (req.user.role !== 'admin') {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
    next()
})
const verifyUserRole = asyncHandler(async (req, res, next) => {
    if (req.user.role !== 'user') {
        res.status(401)
        throw new Error('Not authorized as an user')
    }
    next()
})
module.exports = {
    authorization,
    verifyAdminRole,
    verifyUserRole
}