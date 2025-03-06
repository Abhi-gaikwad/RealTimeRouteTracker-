const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  source: { type: String, required: true },
  destination: { type: String, required: true },
  condition: { type: String, required: true },
  traffic: { type: String, required: true },
  safestTime: { type: String, required: true },
  accidentOccurred: { type: String, enum: ["Yes", "No"], required: true },
  accidentDescription: { type: String, default: "" }, // Default to empty string
  accidentImage: { type: String, default: null }, // Default to null
  review: { type: String, required: true }
}, { timestamps: true }); // Adds createdAt & updatedAt fields

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
