import React, { useState } from "react";
import "./ChatWidget.css";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const currentUserId = 2;
  const messages = [
    {
      sender_id: 1,
      reciever_id: 2,
      sender_name: "Rahul",
      reciever_name: "Manish",
      read: 1,
      sender_message: "Hello Team 👋",
      createdat: "2026-08-04 10:00:00"
    },
    {
      sender_id: 2,
      reciever_id: 1,
      sender_name: "Manish",
      reciever_name: "Rahul",
      read: 1,
      sender_message: "Hi Rahul!",
      createdat: "2026-08-04 10:01:00"
    }
  ];
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
            {messages.length > 0 ? (
              messages.map((msg, index) => {
                const isMe = msg.sender_id === currentUserId;

                return (
                  <div
                    key={index}
                    className={`message ${isMe ? "me" : "other"}`}
                  >
                    <strong>{isMe ? "You" : msg.sender_name}</strong>

                    <p>{msg.sender_message}</p>

                    <small>
                      {new Date(msg.createdat).toLocaleString()}
                    </small>
                  </div>
                );
              })
            ) : (
              <p className="text-center">No messages found.</p>
            )}
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