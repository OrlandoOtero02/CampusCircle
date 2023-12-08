import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import Button from '@mui/material/Button';
import MyConversations from './MyConversations';  //
import Messaging from './Messaging';

const Inbox = () => {
  const { user } = useAuthContext();
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Function to handle selecting a user for direct messages
  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <div>
      <h2>Inbox</h2>

      <h3>My conversations</h3>

      {/* Render the Messaging component with the selectedUserId */}
      {selectedUserId && (
        <div>
          <Messaging circleId={selectedUserId} />
          <Button
            variant="contained"
            onClick={() => setSelectedUserId(null)}
            style={{ marginTop: 10, marginBottom: 20 }}
          >
            Back to Conversations
          </Button>
        </div>
      )}

      {/* Display the list of users, and pass the selectedUserId to the UsersList component */}
      <MyConversations handleSelectUser={handleSelectUser} />

    </div>
    
  );
};

export default Inbox;
