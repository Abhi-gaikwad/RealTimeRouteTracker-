import React, { useState, useEffect } from "react";
import axios from "axios";
import FeedbackForm from "./FeedbackForm";
import "./Feedback.css";

const Feedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://localhost:5000/api/feedback");
      setFeedbackList(response.data);
    } catch (error) {
      console.error("❌ Failed to load feedback:", error);
      setError("Failed to fetch feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-container">
      <h2>Route Reviews</h2>

      {/* Feedback Form */}
      <FeedbackForm onFeedbackSubmit={fetchFeedback} />

      {/* Loading State */}
      {loading && <p>Loading feedback...</p>}

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Feedback List */}
      {!loading && feedbackList.length === 0 && <p>No feedback available.</p>}
      <ul>
        {feedbackList.map((feedback) => (
          <li key={feedback._id || Math.random()}>{feedback.review}</li>
        ))}
      </ul>
    </div>
  );
};

export default Feedback;
