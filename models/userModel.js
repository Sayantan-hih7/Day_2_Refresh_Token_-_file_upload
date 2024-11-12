const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
    },
    phone: {
        type: String,
        required: [true, "Please add a phone number"],
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
    },
    role:{
        type: String,
        default: "user"
    }
},{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model("User", userSchema);