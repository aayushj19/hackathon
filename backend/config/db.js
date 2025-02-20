const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const mongoURI = "mongodb://localhost:27017/forumDB";
        if (!mongoURI) {
            throw new Error("❌ MONGO_URI is not defined in .env file");
        }

        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;