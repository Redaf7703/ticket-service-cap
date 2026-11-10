import React, { useState } from "react";
import "./AIChat.css";
const API_URL = "http://localhost:3001/api/chat";

async function askAgent(history) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: history })
  });
  const data = await res.json();
  return data.reply || `Error: ${data.error}`;
}

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "👋 Hi Rida! I'm your Agent. How can I help you with your dashboard today?",
      time: "10:30 AM",
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      type: "user",
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentMessage = message.toLowerCase();
    setMessage("");

        (async () => {
      let reply;
      try {
        const history = [...messages, { type: "user", text: currentMessage }].map(
          (m) => ({
            role: m.type === "user" ? "user" : "assistant",
            content: m.text,
          })
        );

        // the conversation must start with a user message
        const firstUser = history.findIndex((m) => m.role === "user");
        reply = await askAgent(history.slice(firstUser));
      } catch (e) {
        reply =
          "Sorry, I could not reach the ticket service. Please check that the backend is running.";
      }

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: reply,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    })();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button className="chat-open-button" onClick={() => setIsOpen(true)}>
        🧑‍💼
      </button>
    );
  }

  return (
    <div className="ai-chat">

      {/* Header */}
      <div className="chat-header">
        <div className="chat-title">
          <div className="bot-icon">🧑‍💼</div>

          <div>
            <h3>AI Assistant</h3>
            <div className="online-status">
              <span></span>
              Online
            </div>
          </div>
        </div>

        <div className="chat-actions">
          <button onClick={() => setIsOpen(false)}>−</button>
          <button onClick={() => setIsOpen(false)}>×</button>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-row ${
              msg.type === "user" ? "user-row" : "bot-row"
            }`}
          >
            {msg.type === "bot" && (
              <div className="small-bot-icon">🤖</div>
            )}

            <div>
              <div
                className={`message ${
                  msg.type === "user" ? "user-message" : "bot-message"
                }`}
              >
                {msg.text}
              </div>

              <div
                className={`message-time ${
                  msg.type === "user" ? "user-time" : ""
                }`}
              >
                {msg.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button onClick={sendMessage}>
          ➤
        </button>
      </div>

      <div className="powered-by">
        ✨ Powered by AI
      </div>
    </div>
  );
};

export default AIChat;