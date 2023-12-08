import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import axios from 'axios';
import Button from '@mui/material/Button';

const Inbox = () => {
  const [conversations, setConversations] = useState([]);
  const [participants, setParticipants] = useState([]);
  const { user: currentUser } = useAuthContext();


  useEffect(() => {
    // Fetch conversations for the logged-in user
    const fetchConversations = async () => {
      try {
        const response = await axios.get('/api/user/conversations/' + currentUser._id);
        setConversations(response.data);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    fetchConversations();
  }, []);

  const initiateConversation = async () => {
    try {
      // Replace 'userId1' and 'userId2' with the actual user IDs you want to start a conversation with
      const userId1 = currentUser;
      const userId2 = currentUser;

      const response = await axios.post('/api/conversations/create', {
        participants: [userId1, userId2],
        initialMessage: 'Hello, let\'s chat!',
      });

      // Add the new conversation to the state
      setConversations([...conversations, response.data]);

      // Reset the participants state
      setParticipants([]);
    } catch (error) {
      console.error('Error initiating conversation:', error);
    }
  };

  return (
    <div>
      <h2>Inbox</h2>
      <Button variant="contained" style={{marginBottom: 10}}>Send Message</Button><br/><br/>

      <h3>My conversations</h3>
      
      {/* Button to initiate a new conversation */}
      <button onClick={initiateConversation}>Initiate Conversation</button>

      <div>
        {conversations.map((conversation) => (
          <div key={conversation._id} className="conversation">
            {/* Display participants or other relevant information */}
            <h3>Conversation with {conversation.participants.map((participant) => participant.username).join(', ')}</h3>
            
            {/* Display last message */}
            <p>Last Message: {conversation.messages.length > 0 ? conversation.messages[0].content : 'No messages'}</p>
            
            {/* Display timestamp of the last message */}
            <p>Last Message Time: {conversation.messages.length > 0 ? new Date(conversation.messages[0].timestamp).toLocaleString() : 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inbox;

