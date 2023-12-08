import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useAuthContext } from '../hooks/useAuthContext';

const socket = io('http://localhost:4000'); // Replace with your server URL

function Messaging() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const {user} = useAuthContext()

  const handleSendMessage = async () => {
    if (message) {
      try {
        // Use the fetch API to send a POST request to the server
        const response = await fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify({ message, user }),
        });

        if (response.ok) {
          // Message sent successfully, update the local state
          setMessage('');
        } else {
          console.error('Failed to send message');
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  useEffect(() => {
    // Event listener for incoming messages
    socket.on('message', (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off('message');
    };
  }, []);

  return (
    <div>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.user}: </strong>
            {msg.text}
          </div>
        ))}
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