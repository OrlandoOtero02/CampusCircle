import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import axios from 'axios';
import Button from '@mui/material/Button';
import MyConversations from './MyConversations';

const Inbox = () => {
  // You can use any state or logic specific to the Inbox component here

  return (
    <div>
      <h2>Inbox</h2>
      <Button variant="contained" style={{ marginBottom: 10 }}>
        Send Message
      </Button>
      <br />

      {/* Include the UsersList component to display a list of users */}
      <MyConversations />

      <h3>My conversations</h3>
      {/* Add logic to display conversations or other inbox-related content */}
    </div>
  );
};

export default Inbox;
