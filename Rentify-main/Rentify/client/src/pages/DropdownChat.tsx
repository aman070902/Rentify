import React, { useState } from "react";
import Chatroom from "./Chatroom"; // Import Chatroom component

const DropdownChat: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown-chat">
      <button onClick={() => setOpen(!open)}>Open Chat</button>
      {open && (
        <div className="chatbox">
          <Chatroom /> {/* Reuse Chatroom component */}
        </div>
      )}
    </div>
  );
};

export default DropdownChat;

