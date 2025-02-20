const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    expertise: { type: [String], required: true },
    available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Mentor", mentorSchema);