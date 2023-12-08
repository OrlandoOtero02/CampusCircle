import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import Button from '@mui/material/Button';

function Messaging({circleId}) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userObject, setUserObject] = useState();
  const {user} = useAuthContext()
  const circle = circleId;

  const getUser = async (e) => {
    const response = await fetch('/api/user/getUserById/' + user._id, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
    });

    if (response.ok) {
      const data = await response.json();
      setUserObject(data.user);
    } else {
      console.error('Failed to fetch user');
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const username = userObject.username;
    console.log(circle)
    try {
      // Use the fetch API to send a POST request to the server
      const response = await fetch('/api/messages', {
        method: 'POST',
        body: JSON.stringify({ message, username, circle }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
      });
  
      if (response.ok) {
        // Message sent successfully, update the local state immediately
        const newMessage = { username, message };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage('');
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // useEffect to fetch messages from the server when the component mounts
  useEffect(() => {
    getUser();
    console.log(circle)
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/messages/' + circle, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Update the local state with the received messages
          setMessages(data);
          console.log(data);
        } else {
          console.error('Failed to fetch messages');
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    // Call the fetchMessages function when the component mounts
    fetchMessages();
  }, [user.token]);


  return (
    <div>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.username}: </strong>
            {msg.message}
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
        <Button variant="contained" onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  );
}

export default Messaging;