const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    thread: { type: mongoose.Schema.Types.ObjectId, ref: "Thread" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true },
    codeSnippet: { type: String, default: "" },
    upvotes: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);
