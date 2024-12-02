import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Chatroom: React.FC = () => {
  const { chatroomId } = useParams();
  const [messages, setMessages] = useState<{ sender: string; content: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Fetch messages when chatroom loads
    fetch(`/api/chatrooms/${chatroomId}`)
      .then(res => res.json())
      .then(data => setMessages(data));
  }, [chatroomId]);

  const sendMessage = () => {
    fetch(`/api/chatrooms/${chatroomId}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender: "userId", content: newMessage }),
    })
      .then(res => res.json())
      .then(() => {
        setMessages(prev => [...prev, { sender: "userId", content: newMessage }]);
        setNewMessage("");
      });
  };

  return (
    <div className="chatroom">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatroom;

