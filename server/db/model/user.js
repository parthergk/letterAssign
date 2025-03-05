const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    googleAccessToken: {type: String, required: true, unique: true}
});

const User = mongoose.model("User", userSchema);
module.exports = User;
