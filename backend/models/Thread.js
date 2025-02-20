const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    upvotes: { type: Number, default: 0 },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }]
}, { timestamps: true });

module.exports = mongoose.model("Thread", threadSchema);
