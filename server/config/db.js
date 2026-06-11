// config/db.js - MongoDB Atlas connection using Mongoose
// Called once at server startup; retries are handled by Mongoose's built-in reconnect logic

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1); // Exit process with failure — server can't run without DB
  }
};

module.exports = connectDB;
