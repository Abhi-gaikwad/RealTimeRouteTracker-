import React, { useState } from "react";
import axios from "axios";
import "./FeedbackForm.css";

const FeedbackForm = ({ onFeedbackSubmit }) => {
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    condition: "",
    traffic: "",
    safestTime: "",
    accidentOccurred: "No",
    accidentDescription: "",
    review: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/feedback", {
        ...formData,
        accidentDescription: formData.accidentOccurred === "Yes" ? formData.accidentDescription : "",
      });

      alert(response.data.message);
      setFormData({
        source: "",
        destination: "",
        condition: "",
        traffic: "",
        safestTime: "",
        accidentOccurred: "No",
        accidentDescription: "",
        review: "",
      });

      onFeedbackSubmit();
    } catch (error) {
      console.error("❌ Failed to submit feedback:", error.response?.data || error.message);
      alert("Failed to submit feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <h3>Submit Your Feedback</h3>

      {["source", "destination", "condition", "traffic", "safestTime"].map((field) => (
        <label key={field}>
          {field.charAt(0).toUpperCase() + field.slice(1)}:
          <input type="text" name={field} value={formData[field]} onChange={handleChange} required />
        </label>
      ))}

      <label>
        Accident Occurred:
        <select name="accidentOccurred" value={formData.accidentOccurred} onChange={handleChange} required>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </label>

      {formData.accidentOccurred === "Yes" && (
        <label>
          Accident Description:
          <input type="text" name="accidentDescription" value={formData.accidentDescription} onChange={handleChange} required />
        </label>
      )}

      <label>
        Review:
        <textarea name="review" value={formData.review} onChange={handleChange} required></textarea>
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Feedback"}
      </button>
    </form>
  );
};

export default FeedbackForm;
