const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
    },
    role:{
        type: String,
        default: "admin"
    }
},{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model("Admin", adminSchema);