const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();
app.use(express.json()); // Parse JSON request body

// ✅ Improved CORS configuration (Allow only frontend)
app.use(cors({
  origin: "http://localhost:3000", // Change this to your frontend URL in production
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// ✅ Connect to MongoDB with better error handling
const MONGO_URI = "mongodb://127.0.0.1:27017/feedbackDB";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit if MongoDB fails to connect
  });

// Handle MongoDB connection errors after initial connection
mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB Connection Lost:", err);
});

// Graceful shutdown handling for MongoDB
process.on("SIGINT", async () => {
  console.log("⚠️ Closing MongoDB Connection...");
  await mongoose.connection.close();
  console.log("✅ MongoDB Connection Closed.");
  process.exit(0);
});

// ✅ Routes
app.use("/api/feedbacks", feedbackRoutes);

// ✅ Start Express Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
