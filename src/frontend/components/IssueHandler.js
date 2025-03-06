import React, { useState } from "react";
import { motion } from "framer-motion";

const IssueHandler = ({ source, destination, onClose }) => {
  const [selectedIssue, setSelectedIssue] = useState("");

  const handleSubmit = () => {
    if (!selectedIssue) {
      alert("⚠️ Please select an issue before submitting!");
      return;
    }

    if (selectedIssue === "Alert Safety") {
      sendWhatsAppAlert();
    } else {
      alert(`🚧 Issue reported: ${selectedIssue}\n\nWe will investigate and resolve it soon!`);
    }

    onClose();
  };

  const sendWhatsAppAlert = () => {
    const message = `🚨 *Safety Alert!* 🚨\n\nThere is a safety concern between:\n\n🔹 *Source:* ${source}\n🔹 *Destination:* ${destination}\n\nPlease take necessary precautions!`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
  };

  return (
    <>
      {/* Background Overlay with Blur Effect */}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50">
        {/* Floating Card with Animation */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="bg-gradient-to-r from-blue-500 to-blue-700 w-full max-w-md p-8 rounded-2xl shadow-2xl border border-gray-300 dark:border-gray-700 relative text-white"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-100 hover:text-red-300 text-2xl transition-all"
          >
            ✖
          </button>

          {/* Header */}
          <h3 className="text-2xl font-semibold text-center">
            🚨 Report an Issue
          </h3>
          <p className="text-lg text-gray-200 text-center mb-6">
            Select an issue and help us improve safety.
          </p>

          {/* Dropdown Menu */}
          <div className="relative">
            <select
              value={selectedIssue}
              onChange={(e) => setSelectedIssue(e.target.value)}
              className="w-full p-4 border rounded-lg bg-white text-gray-900 text-lg focus:ring focus:ring-yellow-400 transition"
            >
              <option value="" disabled>Select an issue</option>
              <option value="Path Not Found">🚧 Path Not Found</option>
              <option value="Alert Safety">⚠️ Safety Alert</option>
              <option value="Incorrect Route">🔄 Incorrect Route</option>
              <option value="Traffic Issue">🚦 Traffic Issue</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 text-lg rounded-lg transition-all duration-300"
          >
            Report Issue
          </button>
        </motion.div>
      </div>
    </>
  );
};

export default IssueHandler;
