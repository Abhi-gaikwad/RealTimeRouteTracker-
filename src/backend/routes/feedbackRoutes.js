const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// ✅ POST Feedback
router.post("/", async (req, res) => {
  try {
    const { source, destination, condition, traffic, safestTime, accidentOccurred, accidentDescription, accidentImage, review } = req.body;

    const feedback = new Feedback({
      source,
      destination,
      condition,
      traffic,
      safestTime,
      accidentOccurred,
      accidentDescription: accidentDescription || "", // Ensuring default value
      accidentImage: accidentImage || null, // Ensuring default value
      review
    });

    await feedback.save();
    res.status(201).json({ message: "Feedback stored successfully!", data: feedback });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
