import React, { useState } from "react";
import "./ChatWidget.css";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <span>💬 Company Chat</span>

            <button
              className="close-btn"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="chat-body">
            <div className="message other">
              <strong>Rahul</strong>
              <p>Hello Team 👋</p>
            </div>

            <div className="message me">
              <strong>You</strong>
              <p>Hi Rahul!</p>
            </div>
          </div>

          <div className="chat-footer">
            <input
              type="text"
              placeholder="Type a message..."
            />

            <button>Send</button>
          </div>
        </div>
      )}

      {/* Floating Chat Icon */}
      <button
        className="chat-icon"
        onClick={() => setOpen(!open)}
      >
        💬
      </button>
    </>
  );
}