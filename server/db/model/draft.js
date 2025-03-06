const mongoose = require("mongoose");

const draftSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true }
});

const Draft = mongoose.model("Draft", draftSchema);
module.exports = Draft;
