const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    isVerified: { type: Boolean, default: false },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    commentNotification: { type: Boolean, default: true },
});

module.exports = mongoose.model("User", userSchema);