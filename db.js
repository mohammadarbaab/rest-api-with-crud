const mongoose = require("mongoose");
require("dotenv").config();

// const mongoURL = "mongodb://127.0.0.1:27017/clinic";
// const mongoURL="mongodb+srv://hotels:Hotels12345@cluster0.m7o9j.mongodb.net/"

const mongoURL = process.env.MONGODB_URL;

mongoose
  .connect(mongoURL, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error:", err));

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("Connection error:", err);
  console.log("MongoDB connection failed");
});

db.on("connected", () => {
  console.log("Connected to MongoDB");
});
db.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

// export the database connection
module.exports = db;
