import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import axios from 'axios';
import Button from '@mui/material/Button';

const Inbox = () => {

  return (
    <div>
      <h2>Inbox</h2>
      <Button variant="contained" style={{marginBottom: 10}}>Send Message</Button><br/><br/>

      <h3>My conversations</h3>
    </div>
  );
};

export default Inbox;

