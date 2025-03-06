import React from 'react';
import ChatBotIcon from './ChatBotIcon'; // Ensure this path is correct

const ChatMessage = ({ chat }) => {
  if (!chat) {
    return null; // Return null if chat is undefined
  }

  const { role, text } = chat;

  return (
    <div className={`message ${role === 'bot' ? 'bot-message' : 'user-message'}`}>
      {role === 'bot' && <ChatBotIcon />}
      <p className="message-text">{text}</p>
    </div>
  );
};

export default ChatMessage;