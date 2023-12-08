import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

function Messaging() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const {user} = useAuthContext()

  const handleSendMessage = async (e) => {
    e.preventDefault();

        // Use the fetch API to send a POST request to the server
        const response = await fetch('/api/messages', {
          method: 'POST',
          body: JSON.stringify({ message }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
        });

        if (response.ok) {
          // Message sent successfully, update the local state
          setMessage('');
        } else {
          console.error('Failed to send message');
        }
  };

  return (
    <div>
      <div className="chat-box">
        
      </div>
      <div className="input-box">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Messaging;
/*{messages.map((msg, index) => (
  <div key={index} className="message">
    <strong>{msg.user}: </strong>
    {msg.text}
  </div>
))}*/